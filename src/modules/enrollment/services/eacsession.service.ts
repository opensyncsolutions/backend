import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, In, TreeRepository } from 'typeorm';
import {
  EacSession,
  GetManyReqInterface,
  GetManySanitized,
  SharedService,
  getWhereConditions,
} from '@app/opensync';

@Injectable()
export class EacSessionService extends SharedService<EacSession> {
  constructor(
    @InjectRepository(EacSession)
    repository: TreeRepository<EacSession>,
  ) {
    super(repository, EacSession);
  }

  getMany = async (body: GetManySanitized): Promise<any> => {
    const { payload } = body;
    const [data, total] = await this.repository.findAndCount({
      select: this.getSelections(payload.fields),
      relations: this.getRelations(payload.fields),
      where: this.sanitizeWhere(getWhereConditions(payload), payload),
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
    if (Array.isArray(where))
      return where.map((w) => {
        return {
          ...w,
          eac: {
            ...(w.eac || {}),
            enrollment: {
              ...(where['eac'] ? where['eac']['enrollment'] || {} : {}),
              organisationUnit: {
                path: In(
                  (payload?.user?.organisationUnits ?? []).map(
                    (organisationUnit) => ILike(`%${organisationUnit.id}%`),
                  ),
                ),
              },
            },
          },
        };
      });
    return {
      ...(where || {}),
      eac: {
        ...(where['eac'] || {}),
        enrollment: {
          ...(where['eac'] ? where['eac']['enrollment'] || {} : {}),
          organisationUnit: {
            path: In(
              (payload?.user?.organisationUnits ?? []).map((organisationUnit) =>
                ILike(`%${organisationUnit.id}%`),
              ),
            ),
          },
        },
      },
    };
  };
}
