import {
  EnrollmentAnalytics,
  GetManyReqInterface,
  GetManySanitized,
  USERAUTHORITIES,
  getWhereConditions,
  relations,
  select,
} from '@app/opensync';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  EntityMetadata,
  FindOptionsOrder,
  FindOptionsRelations,
  Like,
  Repository,
} from 'typeorm';

@Injectable()
export class EnrollmentAnalyticsService {
  constructor(
    @InjectRepository(EnrollmentAnalytics)
    readonly repository: Repository<EnrollmentAnalytics>,
  ) {}

  findMany = async (payload: GetManyReqInterface) => {
    const AUTHORITIES = USERAUTHORITIES(payload.user);
    if (
      AUTHORITIES?.includes(EnrollmentAnalytics.READ) ||
      AUTHORITIES?.includes('ALL') ||
      EnrollmentAnalytics.READ === 'ALL'
    ) {
      return await this.getMany({ payload, roles: AUTHORITIES });
    }
    this.throwGenericError(
      new UnauthorizedException(
        `You have no permission to view enrollment analysis`,
      ),
    );
  };

  getMany = async (body: GetManySanitized): Promise<any> => {
    const { payload } = body;
    if (!(payload?.user?.organisationUnits ?? []).length) {
      return {
        page: payload.page + 1,
        total: 0,
        pageSize: payload.pageSize,
        [EnrollmentAnalytics.plural]: [],
      };
    }
    const [data, total] = await this.repository.findAndCount({
      select: this.getSelections(payload.fields),
      relations: this.getRelations(payload.fields),
      where: this.sanitizeWhere(getWhereConditions(payload), payload) as any,
      skip: payload.pageSize * payload.page,
      take: payload.pageSize,
      order: this.getOrder(payload.order),
    });
    return {
      page: payload.page + 1,
      total,
      pageSize: payload.pageSize,
      [EnrollmentAnalytics.plural]: data,
    };
  };

  private throwGenericError = (exception: any) => {
    throw exception;
  };

  private getSelections = (fields: string) => {
    return fields ? select(fields, this.repository.metadata) : {};
  };

  private getRelations = (
    fields: string,
  ): FindOptionsRelations<EnrollmentAnalytics> => {
    const entity: EntityMetadata =
      this.repository.manager.connection.getMetadata(EnrollmentAnalytics);
    return fields ? relations(fields, entity) : [];
  };

  private getOrder = (order: string) => {
    if (!order)
      return {
        created: 'DESC',
      } as unknown as FindOptionsOrder<EnrollmentAnalytics>;
    const orderArray = order?.split(':eq:');
    return (orderArray?.length > 0
      ? { [orderArray[0] || 'created']: orderArray[1] || 'DESC' }
      : {
          created: 'DESC',
        }) as unknown as FindOptionsOrder<EnrollmentAnalytics>;
  };

  private sanitizeWhere = (where: object, payload: GetManyReqInterface) => {
    if (Array.isArray(where)) {
      return (payload?.user?.organisationUnits ?? []).map(
        (organisationUnit) => {
          return where.map((w) => ({
            organisationUnit: {
              ouPath: Like(`%${organisationUnit.id}%`),
              ...(w.organisationUnit || {}),
            },
            ...w,
          }));
        },
      );
    }
    return (payload?.user?.organisationUnits ?? []).map((organisationUnit) => {
      return {
        ...(where ?? {}),
        organisationUnit: {
          ouPath: Like(`%${organisationUnit.id}%`),
          ...(where ? where['organisationUnit'] ?? {} : {}),
        },
      };
    });
  };

  generateAnalytics = async (): Promise<void> => {
    try {
      Logger.debug('STARTED RUNNING ANALYTICS', 'ANALYTICS');
      await this.repository.query(
        `DROP TABLE IF EXISTS enrollmentanalytics_temp;`,
      );
      Logger.debug('CREATING TEMP ENROLLMENT ANALYTICS TABLE', 'ANALYTICS');
      await this.repository.query(
        `
        CREATE TABLE enrollmentanalytics_temp AS
        SELECT * FROM enrollmentanalytics WHERE 1=0;
      `,
      );
      Logger.debug('INSERTING ENROLLMENT ANALYTICS IN TEMP TABLE', 'ANALYTICS');
      await this.repository.query(`
      INSERT INTO enrollmentanalytics_temp (id, enrollments, eligible, non, ou, created, updated)
      SELECT
      uuid_generate_v4() AS id,
      COUNT(*) AS enrollments,
      COUNT(CASE WHEN EXTRACT(YEAR FROM age(dob)) >= 18 AND recentvisit >= recentvisit - interval '28 days' THEN 1 END) AS eligible,
      COUNT(CASE WHEN EXTRACT(YEAR FROM age(dob)) < 18 OR recentvisit < recentvisit - interval '28 days' THEN 1 END) AS non,
      ou,
      CURRENT_TIMESTAMP AS created,
      CURRENT_TIMESTAMP AS updated
      FROM
      enrollment
      GROUP BY
      ou;
  `);
      Logger.debug('DROPING EXISTING ANALYTICS TABLE', 'ANALYTICS');
      await this.repository.query(`DROP TABLE enrollmentanalytics;`);

      Logger.debug('RENAMING ENROLLMENT ANALYTICS TABLE', 'ANALYTICS');
      await this.repository.query(
        `ALTER TABLE enrollmentanalytics_temp RENAME TO enrollmentanalytics;`,
      );

      Logger.debug('UPDATING TOTAL OBJECTIVE SUMMARIES', 'ANALYTICS');
      await this.repository.query(`
      UPDATE objective
      SET enrollments = (
      SELECT COUNT(*)
      FROM enrollment
      WHERE objective = objective.id);
  `);

      Logger.debug('UPDATING OU PATHS', 'ANALYTICS');
      await this.repository.query(`
      WITH RECURSIVE PathCTE AS (
        SELECT id, "parentId", CAST(id AS TEXT) AS path, 1 AS level
        FROM organisationunit
        WHERE "parentId" IS NULL
        UNION ALL
        SELECT t.id, t."parentId", p.path || '/' || t.id, p.level + 1
        FROM organisationunit t
        JOIN PathCTE p ON t."parentId" = p.id
      )
      UPDATE organisationunit AS t
      SET oupath = p.path,  level = p.level
      FROM PathCTE p
      WHERE t.id = p.id;
  `);
    } catch (e) {
      console.error(e);
      Logger.error(e.message, 'ANALYTICS');
    }
  };
}
