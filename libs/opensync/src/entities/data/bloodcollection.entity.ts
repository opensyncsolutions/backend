import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { DateEntity } from '../general/date.entity';
import { Enrollment } from './enrollment.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Entity('bloodcollection')
export class BloodCollection extends DateEntity {
  static plural = 'bloodCollections';
  static READ = 'READ_BLOODCOLLECTIONS';
  static ADD = 'ADD_BLOODCOLLECTIONS';
  static DELETE = 'DELETE_BLOODCOLLECTIONS';
  static UPDATE = 'UPDATE_BLOODCOLLECTIONS';

  @ManyToOne(() => Enrollment, (enrollment) => enrollment.bloodCollections, {
    nullable: false,
  })
  @JoinColumn({ name: 'enrollment' })
  @ApiProperty({ type: Enrollment })
  enrollment: Enrollment;

  @Column({ nullable: true, name: 'mdhcollection', comment: 'MDH Collection' })
  @ApiPropertyOptional()
  mdhCollection: string;

  @Column({ nullable: true, comment: 'Result' })
  @ApiPropertyOptional()
  result: string;

  @Column({ nullable: true, name: 'resultdate', comment: 'Result Date' })
  @ApiPropertyOptional()
  resultDate: Date;
}
