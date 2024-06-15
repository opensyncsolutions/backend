import { SharedController, Section } from '@app/opensync';
import { Controller } from '@nestjs/common';
import { SectionService } from '../services/section.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Form Sections')
@Controller(`api/${Section.plural}`)
export class SectionController extends SharedController<Section> {
  constructor(service: SectionService) {
    super(service);
  }
}
