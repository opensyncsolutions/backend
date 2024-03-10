import { readFileSync } from 'fs';
import {
  BeforeInsert,
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CLIENT } from '../../system';
import { NameEntity } from './named.entity';

@Entity('menu')
@Index('unique_menu', ['path', 'name'], { unique: true })
export class Menu extends NameEntity {
  static plural = 'menus';
  static READ = 'READ_MENUS';
  static ADD = 'ADD_MENUS';
  static DELETE = 'DELETE_MENUS';
  static UPDATE = 'UPDATE_MENUS';

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  path: string;

  @Column({ name: 'sort', nullable: true })
  sortOrder: number;

  @Column({ type: 'json', nullable: true })
  translations: object;

  @Column({ name: 'displayname' })
  displayName: string;

  public static async createMenus(id: string) {
    try {
      const manifest = JSON.parse(
        readFileSync(`${CLIENT}/manifest.webapp`, 'utf8'),
      );
      if (manifest.menus && Array.isArray(manifest.menus)) {
        await this.createMenu(manifest.menus, id);
      }
    } catch (e) {}
  }

  public static async createMenu(menus: any[], id: string): Promise<void> {
    for (let menu of menus) {
      const existingMenu = await Menu.findOne({
        where: { name: menu.name },
      });
      if (!existingMenu) {
        menu = Menu.create({ ...menu, createdBy: { id } });
        await Menu.save(menu);
        return;
      }
    }
  }

  @BeforeInsert()
  beforeInsert() {
    if (!this.displayName) {
      this.displayName = this.name;
    }
  }
}
