import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TreeRepository } from 'typeorm';
import { DataCollection, SharedService } from '@app/opensync';

@Injectable()
export class DataCollectionService extends SharedService<DataCollection> {
  constructor(
    @InjectRepository(DataCollection)
    repository: TreeRepository<DataCollection>,
  ) {
    super(repository, DataCollection);
  }
}
