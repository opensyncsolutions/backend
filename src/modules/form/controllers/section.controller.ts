import { SharedController, EnrollmentSection } from '@app/opensync';
import { Controller } from '@nestjs/common';
import { SectionService } from '../services/section.service';

@Controller(`api/${EnrollmentSection.plural}`)
export class SectionController extends SharedController<EnrollmentSection> {
  constructor(service: SectionService) {
    super(service);
  }
}
