import { SharedController, Section } from '@app/opensync';
import { Controller } from '@nestjs/common';
import { SectionService } from '../services/section.service';

@Controller(`api/${Section.plural}`)
export class SectionController extends SharedController<Section> {
  constructor(service: SectionService) {
    super(service);
  }
}
