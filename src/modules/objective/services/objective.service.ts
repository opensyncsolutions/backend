import {
  GetManyReqInterface,
  GetManySanitized,
  Objective,
  SharedService,
  USERAUTHORITIES,
  getWhereConditions,
} from '@app/opensync';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, In, TreeRepository } from 'typeorm';

@Injectable()
export class ObjectiveService extends SharedService<Objective> {
  constructor(
    @InjectRepository(Objective)
    repository: TreeRepository<Objective>,
  ) {
    super(repository, Objective);
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
    let filter = payload.filter;
    if (Array.isArray(payload.filter)) filter = payload.filter.join(',');
    if (
      USERAUTHORITIES(payload.user).includes('ALL') ||
      filter?.includes('organisationUnit.')
    )
      return where;
    if (Array.isArray(where))
      return where.map((w) => {
        return {
          ...w,
          organisationUnit: {
            ouPath: In(
              (payload?.user?.organisationUnits ?? []).map((organisationUnit) =>
                ILike(`%${organisationUnit.id}%`),
              ),
            ),
          },
        };
      });
    return {
      ...(where || {}),
      organisationUnit: {
        ouPath: In(
          (payload?.user?.organisationUnits ?? []).map((organisationUnit) =>
            ILike(`%${organisationUnit.id}%`),
          ),
        ),
      },
    };
  };
}
