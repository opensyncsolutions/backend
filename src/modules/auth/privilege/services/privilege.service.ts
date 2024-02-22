import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TreeRepository } from 'typeorm';
import { Privilege, SharedService } from '@app/rkpk';

@Injectable()
export class PrivilegeService extends SharedService<Privilege> {
  constructor(
    @InjectRepository(Privilege)
    repository: TreeRepository<Privilege>,
  ) {
    super(repository, Privilege);
  }
}
