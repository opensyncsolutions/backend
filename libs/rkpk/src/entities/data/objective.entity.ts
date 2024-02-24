import { Entity } from 'typeorm';
import { NameEntity } from '../general/named.entity';

@Entity('objective', { schema: 'public' })
export class Objective extends NameEntity {
  static plural = 'objectives';
  static READ = 'READ_OBJECTIVES';
  static ADD = 'ADD_OBJECTIVES';
  static DELETE = 'DELETE_OBJECTIVES';
  static UPDATE = 'UPDATE_OBJECTIVES';
}
