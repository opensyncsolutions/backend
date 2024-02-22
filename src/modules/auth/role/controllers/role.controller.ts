import { SharedController, Role } from '@app/rkpk';
import { Controller } from '@nestjs/common';
import { RoleService } from '../services/role.service';

@Controller(`api/${Role.plural}`)
export class RoleController extends SharedController<Role> {
  constructor(service: RoleService) {
    super(service);
  }
}
