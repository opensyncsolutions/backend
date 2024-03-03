import { SharedController, Form } from '@app/opensync';
import { Controller } from '@nestjs/common';
import { FormService } from '../services/form.service';

@Controller(`api/${Form.plural}`)
export class FormController extends SharedController<Form> {
  constructor(service: FormService) {
    super(service);
  }
}
