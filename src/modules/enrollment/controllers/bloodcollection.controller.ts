import { SharedController, BloodCollection } from '@app/opensync';
import { Controller } from '@nestjs/common';
import { BloodCollectionService } from '../services/bloodcollection.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Blood Collections')
@Controller(`api/${BloodCollection.plural}`)
export class BloodCollectionController extends SharedController<BloodCollection> {
  constructor(service: BloodCollectionService) {
    super(service);
  }
}
