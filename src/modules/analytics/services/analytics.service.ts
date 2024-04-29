import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, TreeRepository } from 'typeorm';
import {
  EnrollmentAnalytics,
  GetManyReqInterface,
  GetManySanitized,
  SharedService,
  getWhereConditions,
} from '@app/opensync';

@Injectable()
export class EnrollmentAnalyticsService extends SharedService<EnrollmentAnalytics> {
  constructor(
    @InjectRepository(EnrollmentAnalytics)
    repository: TreeRepository<EnrollmentAnalytics>,
  ) {
    super(repository, EnrollmentAnalytics);
  }

  getMany = async (body: GetManySanitized): Promise<any> => {
    const { payload } = body;
    if (!(payload?.user?.organisationUnits ?? []).length) {
      return {
        page: payload.page + 1,
        total: 0,
        pageSize: payload.pageSize,
        [this.entity['plural']]: [],
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
      [this.entity['plural']]: data,
    };
  };

  private sanitizeWhere = (where: object, payload: GetManyReqInterface) => {
    if (Array.isArray(where)) {
      return (payload?.user?.organisationUnits ?? []).map(
        (organisationUnit) => {
          return where.map((w) => ({
            organisationUnit: {
              ...(w.organisationUnit || {}),
              ouPath: Like(`%${organisationUnit.id}%`),
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
          ...(where ? where['organisationUnit'] ?? {} : {}),
          ouPath: Like(`%${organisationUnit.id}%`),
        },
      };
    });
  };

  generateAnalytics = async (): Promise<void> => {
    try {
      await this.repository.query(
        `DROP TABLE IF EXISTS enrollmentanalytics_temp;`,
      );

      await this.repository.query(
        `
        CREATE TABLE enrollmentanalytics_temp AS
        SELECT * FROM enrollmentanalytics WHERE 1=0;
      `,
      );

      await this.repository.query(`
      INSERT INTO enrollmentanalytics_temp (id, enrollments, eligible, non, ou, created, updated)
      SELECT
      uuid_generate_v4() AS id,
      COUNT(*) AS enrollments,
      COUNT(*) AS eligible,
      COUNT(*) AS non,
      ou,
      CURRENT_TIMESTAMP AS created,
      CURRENT_TIMESTAMP AS updated
      FROM
      enrollment
      GROUP BY
      ou;
  `);

      await this.repository.query(`DROP TABLE enrollmentanalytics;`);

      await this.repository.query(
        `ALTER TABLE enrollmentanalytics_temp RENAME TO enrollmentanalytics;`,
      );

      await this.repository.query(`
      UPDATE objective
      SET enrollments = (
      SELECT COUNT(*)
      FROM enrollment
      WHERE objective = objective.id);
  `);
    } catch (e) {
      console.error(e);
    }
  };
}
