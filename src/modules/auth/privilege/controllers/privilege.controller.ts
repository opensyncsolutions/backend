import { SharedController, Privilege } from '@app/opensync';
import { Controller } from '@nestjs/common';
import { PrivilegeService } from '../services/privilege.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Privileges')
@Controller(`api/${Privilege.plural}`)
export class PrivilegeController extends SharedController<Privilege> {
  constructor(service: PrivilegeService) {
    super(service);
  }
}
