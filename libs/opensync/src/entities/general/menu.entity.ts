import {
  BeforeInsert,
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';
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

  @Column({ name: 'displayname' })
  displayName: string;

  @BeforeInsert()
  beforeInsert() {
    if (!this.displayName) {
      this.displayName = this.name;
    }
  }
}
