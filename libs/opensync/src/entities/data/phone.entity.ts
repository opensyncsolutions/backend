import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Enrollment } from './enrollment.entity';

@Entity('phone')
export class Phone extends BaseEntity {
  static plural = 'phones';
  static READ: string = 'READ_PHONES';
  static ADD: string = 'ADD_PHONES';
  static DELETE: string = 'DELETE_PHONES';
  static UPDATE: string = 'UPDATE_PHONES';

  @PrimaryGeneratedColumn('uuid')
  @ApiPropertyOptional()
  id: string;

  @Column()
  @ApiProperty()
  phone: string;

  @Column()
  @ApiProperty()
  network: string;

  @Column({ default: true })
  @ApiPropertyOptional()
  personal: boolean;

  @Column({ nullable: true })
  @ApiPropertyOptional()
  name: string;

  @ManyToOne(() => Enrollment, (enrollment) => enrollment, {
    nullable: false,
    cascade: false,
  })
  @JoinColumn({ name: 'enrollment', referencedColumnName: 'id' })
  @ApiProperty({ type: Enrollment })
  enrollment: Enrollment;
}
