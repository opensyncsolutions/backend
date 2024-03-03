import { SharedController, OrganisationUnit } from '@app/opensync';
import { Controller } from '@nestjs/common';
import { OrganisationUnitService } from '../services/organisationunit.service';

@Controller(`api/${OrganisationUnit.plural}`)
export class OrganisationUnitController extends SharedController<OrganisationUnit> {
  constructor(service: OrganisationUnitService) {
    super(service);
  }
}
