import { BadRequestException, NotFoundException } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { BloodCollection, EnrollmentStage, OrganisationUnit } from '..';
import { ENROLLMENTSTATUS, GENDER } from '../../enums/enrollment.enum';
import { throwError } from '../../helpers';
import { DateEntity } from '../general/date.entity';
import { DataCollection } from './datacollection.entity';
import { Disbursement } from './disbursement.entity';
import { Followup } from './followup.entity';
import { Objective } from './objective.entity';
import { Phone } from './phone.entity';

@Entity('enrollment', { schema: 'public' })
export class Enrollment extends DateEntity {
  static plural = 'enrollments';
  static READ = 'READ_ENROLLMENTS';
  static ADD = 'ADD_ENROLLMENTS';
  static DELETE = 'DELETE_ENROLLMENTS';
  static UPDATE = 'UPDATE_ENROLLMENTS';

  @Column({
    type: 'enum',
    enum: ENROLLMENTSTATUS,
    default: ENROLLMENTSTATUS.control,
    comment: 'Status',
  })
  @ApiPropertyOptional()
  status: ENROLLMENTSTATUS;

  @Column({ name: 'studyid', nullable: true, comment: 'Study ID' })
  @ApiPropertyOptional()
  studyId: string;

  @Column({ name: 'ctcid', comment: 'CTC ID__2' })
  @ApiProperty()
  ctcId: string;

  @Column({
    name: 'recentvisit',
    nullable: true,
    comment: 'Recent Attended Visit__8',
  })
  @ApiPropertyOptional()
  recentVisit: Date;

  @Column({
    default: false,
    name: 'participantconsent',
    comment: 'Participant Consent',
  })
  @ApiPropertyOptional()
  participantConsent: boolean;

  @Column({
    default: false,
    name: 'informedconsent',
    comment: 'Informed Consent__11',
  })
  @ApiPropertyOptional()
  informedConsent: boolean;

  @Column({
    default: false,
    name: 'followupconsent',
    comment: 'Informed Followup Consent__12',
  })
  @ApiPropertyOptional()
  followupConsent: boolean;

  @Column({
    default: false,
    name: 'mobileaccess',
    comment: 'Do you have a mobile phone?__10',
  })
  @ApiPropertyOptional()
  mobileAccess: boolean;

  @Column({
    default: false,
    name: 'fundsconfirmation',
    comment: 'Send Funds Confirmation',
  })
  @ApiPropertyOptional()
  fundsConfirmation: boolean;

  @Column({ nullable: true, comment: 'Nearest Landmark__20' })
  @ApiPropertyOptional()
  landmark: string;

  @Column({ nullable: true, comment: 'Street/Village__19' })
  @ApiPropertyOptional()
  village: string;

  @Column({ nullable: true, name: 'middlename', comment: 'Middle Name__15' })
  @ApiPropertyOptional()
  middleName: string;

  @Column({ nullable: true, name: 'nickname', comment: 'Nick Name__17' })
  @ApiPropertyOptional()
  nickName: string;

  @Column({ nullable: true, name: 'mothername', comment: "Mother's Name__18" })
  @ApiPropertyOptional()
  motherName: string;

  @Column({ nullable: true, name: 'hbcname', comment: 'HBC Name__4' })
  @ApiPropertyOptional()
  hbcName: string;

  @Column({ nullable: true, name: 'hbcnumber', comment: 'HBC Number__5' })
  @ApiPropertyOptional()
  hbcNumber: string;

  @Column({ name: 'firstname', comment: 'First Name__14' })
  @ApiProperty()
  firstName: string;

  @Column({ comment: 'Surname__16' })
  @ApiProperty()
  surname: string;

  @Column({ comment: 'Date of Birth__6' })
  @ApiProperty()
  dob: Date;

  @Column({
    nullable: true,
    name: 'enrollmentdate',
    comment: 'Enrollment Date__1',
  })
  @ApiPropertyOptional()
  enrollmentDate: Date;

  @Column({ nullable: true, name: 'screeningid', comment: 'Screening ID__3' })
  @ApiPropertyOptional()
  screeningId: string;

  @Column({ nullable: true, comment: 'Recent Scheduled Appointment__9' })
  @ApiPropertyOptional()
  appointment: Date;

  @Column({
    nullable: true,
    name: 'scheduledreturn',
    comment: 'Scheduled Return To Care',
  })
  @ApiPropertyOptional()
  scheduledReturn: Date;

  @Column({
    nullable: true,
    name: 'assessmentdate',
    comment: 'Date Eligibility Assessment',
  })
  @ApiPropertyOptional()
  assessmentDate: Date;

  @Column({
    nullable: true,
    name: 'viralloaddate',
    comment: 'Viral Load Date',
  })
  @ApiPropertyOptional()
  viralLoadDate: Date;

  @Column({
    nullable: true,
    name: 'counsellingdate',
    comment: 'Enhanced Adherence Counselling Date',
  })
  @ApiPropertyOptional()
  counsellingDate: Date;

  @Column({
    nullable: true,
    name: 'clinicalinterventionvisit',
    comment: 'Next Clinical Intervention Visit',
  })
  @ApiPropertyOptional()
  clinicalInterventionVisit: Date;

  @Column({
    nullable: true,
    name: 'clinicalcontrolvisit',
    comment: 'Next Clinical Control Visit',
  })
  @ApiPropertyOptional()
  clinicalControlVisit: Date;

  @Column({
    nullable: true,
    name: 'returnmobilenumber',
    comment: 'Return With Mobile Number',
  })
  @ApiPropertyOptional()
  returnMobileNumber: boolean;

  @Column({
    nullable: true,
    name: 'mainconsentstudy',
    comment: 'Study Consent__13',
  })
  @ApiPropertyOptional()
  mainConsentStudy: boolean;

  @Column({
    nullable: true,
    name: 'consenttobecontacted',
    comment: 'Consent To Be Contacted',
  })
  @ApiPropertyOptional()
  consentToBeContacted: boolean;

  @Column({
    nullable: true,
    name: 'completebaselinesurvey',
    comment: 'Complete Baseline Survey',
  })
  @ApiPropertyOptional()
  completeBaselineSurvey: boolean;

  @Column({
    nullable: true,
    name: 'currentenrolled',
    comment: 'Client Currently Enrolled',
  })
  @ApiPropertyOptional()
  currentEnrolled: boolean;

  @Column({ type: 'enum', enum: GENDER, comment: "Participant's Sex__7" })
  @ApiProperty({ enum: GENDER })
  gender: GENDER;

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

  @OneToMany(
    () => BloodCollection,
    (bloodCollection) => bloodCollection.enrollment,
    {
      cascade: true,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
  )
  bloodCollections: BloodCollection[];

  @OneToMany(() => Phone, (phone) => phone.enrollment, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  phones: Phone[];

  @ManyToOne(() => OrganisationUnit, (organisationUnit) => organisationUnit, {
    nullable: false,
    cascade: false,
    eager: false,
  })
  @JoinColumn({ name: 'ou', referencedColumnName: 'id' })
  @ApiProperty({ type: OrganisationUnit })
  organisationUnit: OrganisationUnit;

  @OneToOne(() => Followup, (followup) => followup.enrollment, {
    cascade: true,
  })
  followup: Followup;

  @OneToOne(
    () => DataCollection,
    (dataCollection) => dataCollection.enrollment,
    {
      cascade: true,
    },
  )
  dataCollection: DataCollection;

  @BeforeInsert()
  async beforeInsert() {
    if (this.phones?.length > 0) {
      const id = this.id || uuidv4();
      this.id = id;
      this.phones = this.phones.map((phone) => {
        return { ...phone, enrollment: { id } } as Phone;
      });
    }
    if (!this.organisationUnit?.id) {
      throwError(new NotFoundException('Organisation Unit cannot be null'));
    }

    let messages = [];

    const ou = await OrganisationUnit.findOne({
      where: { id: this.organisationUnit?.id },
    });
    if (!ou) {
      messages = [
        ...messages,
        `Organisation Unit with ID ${this.organisationUnit.id} could not be found`,
      ];
    }
    if (!ou?.active) {
      messages = [
        ...messages,
        `Organisation Unit with ID ${this.organisationUnit.id} is not active`,
      ];
    }
    if (!ou?.data) {
      messages = [
        ...messages,
        `Organisation Unit with ID ${this.organisationUnit.id} does not allow data entry`,
      ];
    }

    if (messages.length) {
      throwError(new BadRequestException(messages.join(', ')));
    }
  }
}
