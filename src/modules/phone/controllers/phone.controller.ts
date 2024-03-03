import { SharedController, Phone } from '@app/opensync';
import { Controller } from '@nestjs/common';
import { PhoneService } from '../services/phone.service';

@Controller(`api/${Phone.plural}`)
export class PhoneController extends SharedController<Phone> {
  constructor(service: PhoneService) {
    super(service);
  }
}
