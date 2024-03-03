import { SharedController, Field } from '@app/opensync';
import { Controller } from '@nestjs/common';
import { FieldService } from '../services/field.service';

@Controller(`api/${Field.plural}`)
export class FieldController extends SharedController<Field> {
  constructor(service: FieldService) {
    super(service);
  }
}
