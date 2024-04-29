import {
  Followup,
  GetManyReqInterface,
  GetManySanitized,
  SharedService,
  getWhereConditions,
} from '@app/opensync';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, TreeRepository } from 'typeorm';

@Injectable()
export class FollowupService extends SharedService<Followup> {
  constructor(
    @InjectRepository(Followup)
    repository: TreeRepository<Followup>,
  ) {
    super(repository, Followup);
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
            ...w,
            enrollment: {
              ...(w.enrollment || {}),
              organisationUnit: {
                ...(w['enrollment']
                  ? w['enrollment']['organisationUnit'] ?? {}
                  : {}),
                ouPath: Like(`%${organisationUnit.id}%`),
              },
            },
          }));
        },
      );
    }
    return (payload?.user?.organisationUnits ?? []).map((organisationUnit) => {
      return {
        ...(where || {}),
        enrollment: {
          ...(where ? where['enrollment'] ?? {} : {}),
          organisationUnit: {
            ...(where && where['enrollment']
              ? where['enrollment']['organisationUnit'] ?? {}
              : {}),
            ouPath: Like(`%${organisationUnit.id}%`),
          },
        },
      };
    });
  };
}
