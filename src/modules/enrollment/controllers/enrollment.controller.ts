import { SharedController, Enrollment } from '@app/rkpk';
import { Controller } from '@nestjs/common';
import { EnrollmentService } from '../services/enrollment.service';

@Controller(`api/${Enrollment.plural}`)
export class EnrollmentController extends SharedController<Enrollment> {
  constructor(service: EnrollmentService) {
    super(service);
  }
}
