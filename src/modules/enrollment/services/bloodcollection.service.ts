import {
  BloodCollection,
  GetManyReqInterface,
  GetManySanitized,
  SharedService,
  USERAUTHORITIES,
  getWhereConditions,
} from '@app/opensync';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, In, TreeRepository } from 'typeorm';

@Injectable()
export class BloodCollectionService extends SharedService<BloodCollection> {
  constructor(
    @InjectRepository(BloodCollection)
    repository: TreeRepository<BloodCollection>,
  ) {
    super(repository, BloodCollection);
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
    if (USERAUTHORITIES(payload.user).includes('ALL')) return where;
    if (Array.isArray(where))
      return where.map((w) => {
        return {
          ...w,
          enrollment: {
            ...(w.enrollment || {}),
            organisationUnit: {
              ouPath: In(
                (payload?.user?.organisationUnits ?? []).map(
                  (organisationUnit) => ILike(`%${organisationUnit.id}%`),
                ),
              ),
            },
          },
        };
      });
    return {
      ...(where || {}),
      enrollment: {
        ...(where['enrollment'] || {}),
        organisationUnit: {
          ouPath: In(
            (payload?.user?.organisationUnits ?? []).map((organisationUnit) =>
              ILike(`%${organisationUnit.id}%`),
            ),
          ),
        },
      },
    };
  };
}
