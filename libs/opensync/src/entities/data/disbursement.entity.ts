import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { DateEntity } from '../general/date.entity';
import { Enrollment } from './enrollment.entity';
import { Network } from '../metadata/mobile.network.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Entity('disbursement')
export class Disbursement extends DateEntity {
  static plural = 'disbursements';
  static READ = 'READ_DISBURSEMENTS';
  static ADD = 'ADD_DISBURSEMENTS';
  static DELETE = 'DELETE_DISBURSEMENTS';
  static UPDATE = 'UPDATE_DISBURSEMENTS';

  @ManyToOne(() => Enrollment, (enrollment) => enrollment.disbursements, {
    nullable: false,
  })
  @JoinColumn({ name: 'enrollment' })
  @ApiProperty({ type: Enrollment })
  enrollment: Enrollment;

  @ManyToOne(() => Network, (network) => network, {
    nullable: true,
  })
  @JoinColumn({ name: 'mobile' })
  @ApiProperty({ type: Network })
  mobileNetwork: Network;

  @Column()
  @ApiProperty()
  amount: number;

  @Column({ nullable: true })
  @ApiPropertyOptional()
  reference: string;

  @Column({ nullable: true })
  @ApiPropertyOptional()
  resultcode: string;

  @Column({ nullable: true })
  @ApiPropertyOptional()
  transid: string;

  @Column({ nullable: true })
  @ApiPropertyOptional()
  result: string;

  @Column({ nullable: true })
  @ApiPropertyOptional()
  message: string;

  @Column({ nullable: true })
  @ApiPropertyOptional()
  utilityref: string;
}
