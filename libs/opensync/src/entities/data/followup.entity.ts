import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { NameEntity } from '../general/named.entity';
import { Enrollment } from './enrollment.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Entity('followup')
export class Followup extends NameEntity {
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

  @Column({ name: 'nextvisit', nullable: true })
  @ApiPropertyOptional()
  nextVisit: Date;

  @Column({ name: 'firstreturn', nullable: true })
  @ApiPropertyOptional()
  firstReturn: Date;

  @Column({ name: 'phonenumber', nullable: true })
  @ApiPropertyOptional()
  phoneNumber: string;

  @Column({ name: 'alternativephonenumber', nullable: true })
  @ApiPropertyOptional()
  alternativePhoneNumber: string;
}
