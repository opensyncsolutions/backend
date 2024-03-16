import {
  DataCollection,
  GetManyReqInterface,
  GetManySanitized,
  SharedService,
  getWhereConditions,
} from '@app/opensync';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, In, TreeRepository } from 'typeorm';

@Injectable()
export class DataCollectionService extends SharedService<DataCollection> {
  constructor(
    @InjectRepository(DataCollection)
    repository: TreeRepository<DataCollection>,
  ) {
    super(repository, DataCollection);
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
          enrollment: {
            ...(w.enrollment || {}),
            organisationUnit: {
              path: In(
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
          path: In(
            (payload?.user?.organisationUnits ?? []).map((organisationUnit) =>
              ILike(`%${organisationUnit.id}%`),
            ),
          ),
        },
      },
    };
  };
}
