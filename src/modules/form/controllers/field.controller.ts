import { SharedController, Field } from '@app/rkpk';
import { Controller } from '@nestjs/common';
import { FieldService } from '../services/field.service';

@Controller(`api/${Field.plural}`)
export class FieldController extends SharedController<Field> {
  constructor(service: FieldService) {
    super(service);
  }
}
