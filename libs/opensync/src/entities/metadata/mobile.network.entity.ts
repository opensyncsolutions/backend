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

  @Column({ comment: 'Network Operator' })
  @ApiProperty()
  operator: string;

  @Column({ comment: 'Transaction Fee' })
  @ApiProperty()
  fee: number;

  @Column({ comment: 'Cash' })
  @ApiProperty()
  cash: number;

  @Column({ comment: 'Status' })
  @ApiProperty()
  status: string;

  @Column({ comment: 'Utility Code' })
  @ApiProperty()
  utilitycode: string;
}
