import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TreeRepository } from 'typeorm';
import { OrganisationUnit, SharedService } from '@app/opensync';

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
    delete payload['path'];
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
      sanitizedPayload.path = `${parent.path}/${payload.id}`;
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
}
