import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { Privilege } from './privilege.entity';
import { DateEntity } from '../general/date.entity';

@Entity('role', { schema: 'public' })
export class Role extends DateEntity {
  static plural = 'roles';
  static READ = 'READ_ROLES';
  static ADD = 'ADD_ROLES';
  static DELETE = 'DELETE_ROLES';
  static UPDATE = 'UPDATE_ROLES';

  @Column({ unique: true })
  name: string;

  @Column({ default: false, name: 'system' })
  @ApiProperty({ nullable: true })
  system: boolean | null;

  @ManyToMany(() => Privilege, (privilege) => privilege, {
    nullable: false,
    cascade: true,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinTable({
    name: 'userprivilege',
    joinColumn: { referencedColumnName: 'id', name: 'privilege' },
    inverseJoinColumn: { referencedColumnName: 'id', name: 'role' },
  })
  @ApiProperty()
  privileges: Privilege[];

  public static createRoles = async (roles: any): Promise<void> => {
    for (const role of roles) {
      try {
        await Role.save(role);
      } catch (e) {}
    }
  };
}
