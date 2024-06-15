import { SharedController, EacSession } from '@app/opensync';
import { Controller } from '@nestjs/common';
import { EacSessionService } from '../services/eacsession.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('EAC & PKC Sessions')
@Controller(`api/${EacSession.plural}`)
export class EacSessionController extends SharedController<EacSession> {
  constructor(service: EacSessionService) {
    super(service);
  }
}
