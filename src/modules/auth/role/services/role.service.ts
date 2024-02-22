import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TreeRepository } from 'typeorm';
import { Role, SharedService } from '@app/rkpk';

@Injectable()
export class RoleService extends SharedService<Role> {
  constructor(
    @InjectRepository(Role)
    repository: TreeRepository<Role>,
  ) {
    super(repository, Role);
  }
}
