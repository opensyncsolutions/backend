import { SharedController, Privilege } from '@app/rkpk';
import { Controller } from '@nestjs/common';
import { PrivilegeService } from '../services/privilege.service';

@Controller(`api/${Privilege.plural}`)
export class PrivilegeController extends SharedController<Privilege> {
  constructor(service: PrivilegeService) {
    super(service);
  }
}
