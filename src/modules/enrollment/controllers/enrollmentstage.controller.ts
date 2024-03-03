import { SharedController, EnrollmentStage } from '@app/opensync';
import { Controller } from '@nestjs/common';
import { EnrollmentStageService } from '../services/enrollmentstage.service';

@Controller(`api/${EnrollmentStage.plural}`)
export class EnrollmentStageController extends SharedController<EnrollmentStage> {
  constructor(service: EnrollmentStageService) {
    super(service);
  }
}
