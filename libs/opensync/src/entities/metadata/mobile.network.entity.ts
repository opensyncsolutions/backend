import { Column, Entity } from 'typeorm';
import { NameEntity } from '../general/named.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('mobilenetwork')
export class Network extends NameEntity {
  static plural = 'networks';
  static READ = 'READ_NETWORKS';
  static ADD = 'ADD_NETWORKS';
  static DELETE = 'DELETE_NETWORKS';
  static UPDATE = 'UPDATE_NETWORKS';

  @Column()
  @ApiProperty()
  operator: string;

  @Column()
  @ApiProperty()
  fee: number;

  @Column()
  @ApiProperty()
  cash: number;

  @Column()
  @ApiProperty()
  status: string;

  @Column()
  @ApiProperty()
  utilitycode: string;
}
