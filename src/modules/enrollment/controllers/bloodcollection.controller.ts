import { SharedController, BloodCollection } from '@app/opensync';
import { Controller } from '@nestjs/common';
import { BloodCollectionService } from '../services/bloodcollection.service';

@Controller(`api/${BloodCollection.plural}`)
export class BloodCollectionController extends SharedController<BloodCollection> {
  constructor(service: BloodCollectionService) {
    super(service);
  }
}
