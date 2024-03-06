import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TreeRepository } from 'typeorm';
import { Eac, SharedService } from '@app/opensync';

@Injectable()
export class EacService extends SharedService<Eac> {
  constructor(
    @InjectRepository(Eac)
    repository: TreeRepository<Eac>,
  ) {
    super(repository, Eac);
  }
}
