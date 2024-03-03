import { SharedController, Network } from '@app/opensync';
import { Controller } from '@nestjs/common';
import { NetworkService } from '../services/network.service';

@Controller(`api/${Network.plural}`)
export class NetworkController extends SharedController<Network> {
  constructor(service: NetworkService) {
    super(service);
  }
}
