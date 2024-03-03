import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TreeRepository } from 'typeorm';
import { Network, SharedService } from '@app/rkpk';

@Injectable()
export class NetworkService extends SharedService<Network> {
  constructor(
    @InjectRepository(Network)
    repository: TreeRepository<Network>,
  ) {
    super(repository, Network);
  }
}
