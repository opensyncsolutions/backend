import { SharedController, EacSession } from '@app/opensync';
import { Controller } from '@nestjs/common';
import { EacSessionService } from '../services/eacsession.service';

@Controller(`api/${EacSession.plural}`)
export class EacSessionController extends SharedController<EacSession> {
  constructor(service: EacSessionService) {
    super(service);
  }
}
