import { ApiProperty } from '@nestjs/swagger';
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
  id: string;

  @Column()
  phone: string;

  @Column()
  network: string;

  @Column({ default: true })
  personal: boolean;

  @Column({ nullable: true })
  name: string;

  @ManyToOne(() => Enrollment, (enrollment) => enrollment, {
    nullable: false,
    cascade: false,
    eager: false,
  })
  @JoinColumn({ name: 'enrollment', referencedColumnName: 'id' })
  @ApiProperty({ type: Enrollment })
  enrollment: Enrollment;
}
