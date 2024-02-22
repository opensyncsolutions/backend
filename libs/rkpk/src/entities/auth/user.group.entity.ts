import { Column, Entity, ManyToMany } from 'typeorm';
import { DateEntity } from '../general/date.entity';
import { User } from './user.entity';

@Entity('usergroups', { schema: 'public' })
export class UserGroup extends DateEntity {
  static plural = 'userGroups';

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string | null;

  @ManyToMany(() => User, (user) => user.userGroups)
  users: User[];
}
