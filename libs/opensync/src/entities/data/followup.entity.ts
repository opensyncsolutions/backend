import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { DateEntity } from '../general/date.entity';
import { Enrollment } from './enrollment.entity';

@Entity('followup')
export class Followup extends DateEntity {
  static plural = 'followups';
  static READ = 'READ_FOLLOWUPS';
  static ADD = 'ADD_FOLLOWUPS';
  static DELETE = 'DELETE_FOLLOWUPS';
  static UPDATE = 'UPDATE_FOLLOWUPS';

  @OneToOne(() => Enrollment, (enrollment) => enrollment.followup, {
    nullable: false,
  })
  @JoinColumn({ name: 'enrollment' })
  @ApiProperty({ type: Enrollment })
  enrollment: Enrollment;

  @Column({ name: 'nextvisit', nullable: true, comment: 'Next Visit Date' })
  @ApiPropertyOptional()
  nextVisit: Date;

  @Column({ name: 'firstreturn', nullable: true, comment: 'First Return Date' })
  @ApiPropertyOptional()
  firstReturn: Date;
}
