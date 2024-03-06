import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TreeRepository } from 'typeorm';
import { BloodCollection, SharedService } from '@app/opensync';

@Injectable()
export class BloodCollectionService extends SharedService<BloodCollection> {
  constructor(
    @InjectRepository(BloodCollection)
    repository: TreeRepository<BloodCollection>,
  ) {
    super(repository, BloodCollection);
  }
}
