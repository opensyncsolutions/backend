import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TreeRepository } from 'typeorm';
import { Objective, SharedService } from '@app/opensync';

@Injectable()
export class ObjectiveService extends SharedService<Objective> {
  constructor(
    @InjectRepository(Objective)
    repository: TreeRepository<Objective>,
  ) {
    super(repository, Objective);
  }
}
