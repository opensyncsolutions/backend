import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TreeRepository } from 'typeorm';
import { Followup, SharedService } from '@app/opensync';

@Injectable()
export class FollowupService extends SharedService<Followup> {
  constructor(
    @InjectRepository(Followup)
    repository: TreeRepository<Followup>,
  ) {
    super(repository, Followup);
  }
}
