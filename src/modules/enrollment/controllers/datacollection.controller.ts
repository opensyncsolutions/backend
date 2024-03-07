import { SharedController, DataCollection } from '@app/opensync';
import { Controller } from '@nestjs/common';
import { DataCollectionService } from '../services/datacollection.service';

@Controller(`api/${DataCollection.plural}`)
export class DataCollectionController extends SharedController<DataCollection> {
  constructor(service: DataCollectionService) {
    super(service);
  }
}