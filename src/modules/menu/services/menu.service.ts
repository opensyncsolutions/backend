import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TreeRepository } from 'typeorm';
import { Menu, SharedService } from '@app/opensync';

@Injectable()
export class MenuService extends SharedService<Menu> {
  constructor(
    @InjectRepository(Menu)
    repository: TreeRepository<Menu>,
  ) {
    super(repository, Menu);
  }
}
