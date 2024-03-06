import { SharedController, Disbursement } from '@app/opensync';
import { Controller } from '@nestjs/common';
import { DisbursementService } from '../services/disbursement.service';

@Controller(`api/${Disbursement.plural}`)
export class DisbursementController extends SharedController<Disbursement> {
  constructor(service: DisbursementService) {
    super(service);
  }
}
