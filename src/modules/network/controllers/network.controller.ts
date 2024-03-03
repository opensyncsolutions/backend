import { SharedController, Network } from '@app/rkpk';
import { Controller } from '@nestjs/common';
import { NetworkService } from '../services/network.service';

@Controller(`api/${Network.plural}`)
export class NetworkController extends SharedController<Network> {
  constructor(service: NetworkService) {
    super(service);
  }
}
