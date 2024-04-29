import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, TreeRepository } from 'typeorm';
import {
  GetManyReqInterface,
  GetManySanitized,
  OrganisationUnit,
  SharedService,
  getWhereConditions,
} from '@app/opensync';

@Injectable()
export class OrganisationUnitService extends SharedService<OrganisationUnit> {
  constructor(
    @InjectRepository(OrganisationUnit)
    repository: TreeRepository<OrganisationUnit>,
  ) {
    super(repository, OrganisationUnit);
  }

  updateEntity = async (
    payload: OrganisationUnit,
  ): Promise<OrganisationUnit> => {
    delete payload['ouPath'];
    const user = payload['user'];
    const existingRecord = await this.findOneOrFailInternal({
      id: payload['id'],
    });
    this.validateSystemEntity(existingRecord, payload);
    const query = payload['query'];
    delete payload['createdBy'];
    delete payload['user'];
    delete payload['query'];
    const sanitizedPayload = await this.sanitizePayload(payload);
    if (payload.parent && payload.parent.id) {
      const parent = await this.findOneOrFailInternal({
        id: payload.parent.id,
      });
      sanitizedPayload.level = parent.level + 1;
      sanitizedPayload.ouPath = `${parent.ouPath}/${payload.id}`;
    }
    payload = this.repository.create({
      ...sanitizedPayload,
      updated: new Date().toISOString(),
    });
    await this.repository.save(sanitizedPayload);
    const updatedPayload = await this.findOneOrFailInternal({
      id: payload.id,
      fields: query.fields,
      filter: query.filters,
    });
    this.runProcess({
      code: 'POST_UPDATE',
      payload: { ...updatedPayload, ...payload },
      params: { user },
    });
    this.runProcess({
      code: `POST_${this.entity['plural'].toUpperCase()}_UPDATE`,
      payload: {
        ...updatedPayload,
        ...payload,
      },
      params: { user },
    });
    return updatedPayload;
  };

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
          ouPath: Like(
            `%${(payload?.user?.organisationUnits ?? []).map((organisationUnit) => organisationUnit.id).join('%')}%`,
          ),
        };
      });
    return {
      ...(where || {}),
      ouPath: Like(
        `%${(payload?.user?.organisationUnits ?? []).map((organisationUnit) => organisationUnit.id).join('%')}%`,
      ),
    };
  };
}
