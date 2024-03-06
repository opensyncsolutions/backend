import { SharedController, Eac } from '@app/opensync';
import { Controller } from '@nestjs/common';
import { EacService } from '../services/eac.service';

@Controller(`api/${Eac.plural}`)
export class EacController extends SharedController<Eac> {
  constructor(service: EacService) {
    super(service);
  }
}
