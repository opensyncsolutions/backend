import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TreeRepository } from 'typeorm';
import { User, SharedService } from '@app/opensync';

@Injectable()
export class UserService extends SharedService<User> {
  constructor(@InjectRepository(User) repository: TreeRepository<User>) {
    super(repository, User);
  }
}
