import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TreeRepository } from 'typeorm';
import { Menu, SharedService, User } from '@app/opensync';

@Injectable()
export class MenuService extends SharedService<Menu> {
  constructor(
    @InjectRepository(Menu)
    repository: TreeRepository<Menu>,
  ) {
    super(repository, Menu);
  }

  saveAndUpdate = async (
    payload: Menu | Menu[],
    user: User,
  ): Promise<Menu | Menu[]> => {
    if (Array.isArray(payload)) {
      for (const menu of payload) {
        await this.saveAndUpdateBulky(menu, user);
      }
      return payload;
    }
    await this.saveAndUpdateBulky(payload as Menu, user);
    return payload;
  };

  saveAndUpdateBulky = async (menu: Menu, user: User): Promise<void> => {
    try {
      const exists = await this.repository.findOne({
        where: { [menu.name ? 'name' : 'id']: menu.name || menu.id },
      });
      if (exists) {
        await this.repository.save({
          ...menu,
          id: exists.id,
          path: menu.path,
          updatedBy: { id: user.id },
        });
        return;
      }
      menu = this.repository.create({ ...menu, createdBy: { id: user.id } });
      await this.repository.save(menu);
    } catch (e) {
      Logger.error(e.message);
    }
  };
}
