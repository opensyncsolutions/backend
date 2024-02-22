import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TreeRepository } from 'typeorm';
import { OrganisationUnit, SharedService } from '@app/rkpk';

@Injectable()
export class OrganisationUnitService extends SharedService<OrganisationUnit> {
  constructor(
    @InjectRepository(OrganisationUnit)
    repository: TreeRepository<OrganisationUnit>,
  ) {
    super(repository, OrganisationUnit);
  }
}
