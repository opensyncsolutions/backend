import { SharedController, Objective } from '@app/opensync';
import { Controller } from '@nestjs/common';
import { ObjectiveService } from '../services/objective.service';

@Controller(`api/${Objective.plural}`)
export class ObjectiveController extends SharedController<Objective> {
  constructor(service: ObjectiveService) {
    super(service);
  }
}