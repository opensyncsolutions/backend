import { SharedController, Menu } from '@app/opensync';
import { Controller } from '@nestjs/common';
import { MenuService } from '../services/menu.service';

@Controller(`api/${Menu.plural}`)
export class MenuController extends SharedController<Menu> {
  constructor(service: MenuService) {
    super(service);
  }
}
