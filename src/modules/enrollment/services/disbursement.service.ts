import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TreeRepository } from 'typeorm';
import { Disbursement, SharedService } from '@app/opensync';

@Injectable()
export class DisbursementService extends SharedService<Disbursement> {
  constructor(
    @InjectRepository(Disbursement)
    repository: TreeRepository<Disbursement>,
  ) {
    super(repository, Disbursement);
  }
}
