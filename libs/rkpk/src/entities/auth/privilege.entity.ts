import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';
import { DateEntity } from '../general/date.entity';

@Entity('privilege', { schema: 'public' })
export class Privilege extends DateEntity {
  static plural = 'privileges';
  static READ = 'READ_AUTHORITIES';
  static ADD = 'ADD_AUTHORITIES';
  static DELETE = 'DELETE_AUTHORITIES';
  static UPDATE = 'UPDATE_AUTHORITIES';

  @Column({ default: false, name: 'system' })
  @ApiProperty({ nullable: true })
  system: boolean | null;

  @Column()
  @ApiProperty()
  name: string;

  @Column({ unique: true })
  @ApiProperty()
  value: string;

  @Column()
  @ApiPropertyOptional()
  description: string;

  public static createSuperPrivilege = async (
    privileges: any,
  ): Promise<void> => {
    for (const privilege of privileges) {
      try {
        await Privilege.save(privilege);
      } catch (e) {}
    }
  };
}
