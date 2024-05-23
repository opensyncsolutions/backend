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
import { ApiProperty } from '@nestjs/swagger';

@Entity('menu')
@Index('unique_menu', ['path', 'name'], { unique: true })
export class Menu extends NameEntity {
  static plural = 'menus';
  static READ = 'ALL';
  static ADD = 'ADD_MENUS';
  static DELETE = 'DELETE_MENUS';
  static UPDATE = 'UPDATE_MENUS';

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @ApiProperty()
  path: string;

  @Column({ comment: 'Name', unique: true })
  @ApiProperty()
  name: string;

  @Column({ name: 'sort', nullable: true })
  @ApiProperty()
  sortOrder: number;

  @Column({ type: 'json', nullable: true })
  @ApiProperty()
  translations: object;

  @Column({ name: 'displayname' })
  @ApiProperty()
  displayName: string;

  public static async createMenus(id: string) {
    try {
      const manifest = JSON.parse(
        readFileSync(`${CLIENT}/manifest.webapp`, 'utf8'),
      );
      if (manifest?.menus && Array.isArray(manifest?.menus)) {
        await this.createMenu(manifest.menus, id);
      }
    } catch (e) {}
  }

  public static createMenu = async (
    menus: any[],
    id: string,
  ): Promise<void> => {
    menus = menus.map((menu) => {
      return {
        ...menu,
        displayName: menu.displayName ?? menu.name,
        createdBy: { id },
      };
    });

    for (const menu of menus) {
      try {
        await Menu.save(menu);
      } catch (e) {}
    }
  };

  @BeforeInsert()
  beforeInsert() {
    if (!this.displayName) {
      this.displayName = this.name;
    }
  }
}
