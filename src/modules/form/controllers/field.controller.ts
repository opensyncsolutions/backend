import { SharedController, Field } from '@app/opensync';
import { Controller } from '@nestjs/common';
import { FieldService } from '../services/field.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Fields')
@Controller(`api/${Field.plural}`)
export class FieldController extends SharedController<Field> {
  constructor(service: FieldService) {
    super(service);
  }
}
