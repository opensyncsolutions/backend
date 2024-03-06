import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { DateEntity } from '../general/date.entity';
import { Network } from '../metadata/mobile.network.entity';
import { Enrollment } from './enrollment.entity';

@Entity('phone')
export class Phone extends DateEntity {
  static plural = 'phones';
  static READ: string = 'READ_PHONES';
  static ADD: string = 'ADD_PHONES';
  static DELETE: string = 'DELETE_PHONES';
  static UPDATE: string = 'UPDATE_PHONES';

  @Column()
  @ApiProperty()
  phone: string;

  @Column({ default: true })
  @ApiPropertyOptional()
  personal: boolean;

  @Column({ nullable: true })
  @ApiPropertyOptional()
  name: string;

  @ManyToOne(() => Enrollment, (enrollment) => enrollment.phones, {
    nullable: false,
    cascade: false,
  })
  @JoinColumn({ name: 'enrollment', referencedColumnName: 'id' })
  @ApiProperty({ type: Enrollment })
  enrollment: Enrollment;

  @ManyToOne(() => Network, (network) => network, {
    nullable: true,
    cascade: false,
  })
  @JoinColumn({ name: 'network', referencedColumnName: 'id' })
  @ApiProperty({ type: Network })
  network: Network;
}
