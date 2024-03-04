import { SharedController, Followup } from '@app/opensync';
import { Controller } from '@nestjs/common';
import { FollowupService } from '../services/followup.service';

@Controller(`api/${Followup.plural}`)
export class FollowupController extends SharedController<Followup> {
  constructor(service: FollowupService) {
    super(service);
  }
}
