import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  BeforeInsert,
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
import { BloodCollection, EnrollmentStage, Field, OrganisationUnit } from '..';
import { Phone } from './phone.entity';
import { Followup } from './followup.entity';
import { Disbursement } from './disbursement.entity';
import { throwError } from '../../helpers';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { DataCollection } from './datacollection.entity';
import { ENROLLMENTSTATUS, GENDER } from '../../enums/enrollment.enum';

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
  })
  @ApiPropertyOptional()
  status: ENROLLMENTSTATUS;

  @Column({ name: 'studyid', nullable: true })
  @ApiPropertyOptional()
  studyID: string;

  @Column({ name: 'ctcid' })
  @ApiProperty()
  ctcId: string;

  @Column({ name: 'recentvisit', nullable: true })
  @ApiPropertyOptional()
  recentVisit: Date;

  @Column({ default: false, name: 'participantconsent' })
  @ApiPropertyOptional()
  participantConsent: boolean;

  @Column({ default: false, name: 'informedconsent' })
  @ApiPropertyOptional()
  informedConsent: boolean;

  @Column({ default: false, name: 'fundsconfirmation' })
  @ApiPropertyOptional()
  fundsConfirmation: boolean;

  @Column({ nullable: true })
  @ApiPropertyOptional()
  landmark: string;

  @Column()
  @ApiProperty()
  village: string;

  @Column({ nullable: true, name: 'middlename' })
  @ApiPropertyOptional()
  middleName: string;

  @Column({ nullable: true, name: 'nickname' })
  @ApiPropertyOptional()
  nickName: string;

  @Column({ nullable: true, name: 'mothername' })
  @ApiPropertyOptional()
  motherName: string;

  @Column({ nullable: true, name: 'hbcname' })
  @ApiPropertyOptional()
  hbcName: string;

  @Column({ nullable: true, name: 'hbcnumber' })
  @ApiPropertyOptional()
  hbcNumber: string;

  @Column({ name: 'firstname' })
  @ApiProperty()
  firstName: string;

  @Column()
  @ApiProperty()
  surname: string;

  @Column()
  @ApiProperty()
  dob: Date;

  @Column({ nullable: true, name: 'enrollmentdate' })
  @ApiPropertyOptional()
  enrollmentDate: Date;

  @Column({ nullable: true, name: 'screeningid' })
  @ApiPropertyOptional()
  screeningId: Date;

  @Column({ nullable: true })
  @ApiPropertyOptional()
  appointment: Date;

  @Column({ nullable: true, name: 'scheduledreturn' })
  @ApiPropertyOptional()
  scheduledReturn: Date;

  @Column({ type: 'enum', enum: GENDER })
  @ApiProperty()
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
    if (!ou.active) {
      messages = [
        ...messages,
        `Organisation Unit with ID ${this.organisationUnit.id} is not active`,
      ];
    }
    if (!ou.data) {
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
