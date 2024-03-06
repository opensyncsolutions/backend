import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { DateEntity } from '../general/date.entity';
import { Objective } from './objective.entity';
import { EnrollmentStage, Field } from '..';
import { Phone } from './phone.entity';
import { Followup } from './followup.entity';
import { Disbursement } from './disbursement.entity';

@Entity('enrollment', { schema: 'public' })
export class Enrollment extends DateEntity {
  static plural = 'enrollments';
  static READ = 'READ_ENROLLMENTS';
  static ADD = 'ADD_ENROLLMENTS';
  static DELETE = 'DELETE_ENROLLMENTS';
  static UPDATE = 'UPDATE_ENROLLMENTS';

  @Column({ default: 'CONTROL' })
  status: 'CONTROL' | 'INTERVENTION';

  @Column({ name: 'studyid', nullable: true })
  studyID: string;

  @Column({ name: 'ctcid' })
  ctcId: string;

  @Column({ name: 'recentvisit', nullable: true })
  recentVisit: Date;

  @Column({ default: false, name: 'participantconsent' })
  participantConsent: boolean;

  @Column({ default: false, name: 'informedconsent' })
  informedConsent: boolean;

  @Column({ default: false, name: 'fundsconfirmation' })
  fundsConfirmation: boolean;

  @Column({ nullable: true })
  landmark: string;

  @Column({ nullable: true })
  village: string;

  @Column({ nullable: true, name: 'middlename' })
  middleName: string;

  @Column({ nullable: true, name: 'nickname' })
  nickName: string;

  @Column({ nullable: true, name: 'mothername' })
  motherName: string;

  @Column({ nullable: true, name: 'hbcname' })
  hbcName: string;

  @Column({ nullable: true, name: 'hbcnumber' })
  hbcNumber: string;

  @Column({ name: 'firstname' })
  firstName: string;

  @Column()
  surname: string;

  @Column()
  dob: Date;

  @Column({ nullable: true, name: 'enrollmentdate' })
  enrollmentDate: Date;

  @Column({ nullable: true, name: 'screeningid' })
  screeningId: Date;

  @Column({ nullable: true })
  appointment: Date;

  @Column({ nullable: true, name: 'scheduledreturn' })
  scheduledReturn: Date;

  @Column()
  gender: 'Male' | 'Female';

  @ManyToOne(() => Objective, (objective) => objective, {
    nullable: false,
    cascade: false,
    eager: false,
  })
  @JoinColumn({ name: 'objective', referencedColumnName: 'id' })
  @ApiProperty({ type: Objective })
  objective: Objective;

  @OneToMany(() => EnrollmentStage, (stage) => stage.enrollment, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  stages: EnrollmentStage[];

  @OneToMany(() => Disbursement, (disbursement) => disbursement.enrollment, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  disbursements: Disbursement[];

  @OneToMany(() => Phone, (phone) => phone.enrollment, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  phones: Phone[];

  @ManyToMany(() => Field, (field) => field, {
    nullable: false,
    cascade: true,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinTable({
    name: 'enrollmentfield',
    joinColumn: { referencedColumnName: 'id', name: 'stage' },
    inverseJoinColumn: { referencedColumnName: 'id', name: 'field' },
  })
  @ApiPropertyOptional({ type: [Field] })
  fields: Field[];

  @OneToOne(() => Followup, (followup) => followup.enrollment, {
    cascade: true,
  })
  followup: Followup;
}
