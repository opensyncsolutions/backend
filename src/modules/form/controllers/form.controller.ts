import { SharedController, Form } from '@app/rkpk';
import { Controller } from '@nestjs/common';
import { FormService } from '../services/form.service';

@Controller(`api/${Form.plural}`)
export class FormController extends SharedController<Form> {
  constructor(service: FormService) {
    super(service);
  }
}
