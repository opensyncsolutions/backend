import {
  Enrollment,
  GetManyReqInterface,
  GetManySanitized,
  SharedService,
  getWhereConditions,
} from '@app/opensync';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, TreeRepository } from 'typeorm';

@Injectable()
export class EnrollmentService extends SharedService<Enrollment> {
  constructor(
    @InjectRepository(Enrollment)
    repository: TreeRepository<Enrollment>,
  ) {
    super(repository, Enrollment);
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
}
