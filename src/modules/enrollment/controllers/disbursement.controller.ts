import { SharedController, Disbursement } from '@app/opensync';
import { Controller } from '@nestjs/common';
import { DisbursementService } from '../services/disbursement.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Disbursements')
@Controller(`api/${Disbursement.plural}`)
export class DisbursementController extends SharedController<Disbursement> {
  constructor(service: DisbursementService) {
    super(service);
  }
}
