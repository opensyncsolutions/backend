import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { DateEntity } from '../general/date.entity';
import { Enrollment } from './enrollment.entity';
import { SAMPLESTATUS, SURVEYSTATUS } from '../../enums/data.collection.enum';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Entity('dataCollection')
export class DataCollection extends DateEntity {
  static plural = 'dataCollections';
  static READ = 'READ_BLOODCOLLECTIONS';
  static ADD = 'ADD_BLOODCOLLECTIONS';
  static DELETE = 'DELETE_BLOODCOLLECTIONS';
  static UPDATE = 'UPDATE_BLOODCOLLECTIONS';

  @OneToOne(() => Enrollment, (enrollment) => enrollment.followup, {
    nullable: false,
  })
  @JoinColumn({ name: 'enrollment' })
  @ApiProperty({ type: Enrollment })
  enrollment: Enrollment;

  @Column({ name: 'mdhstatus', comment: 'MDH Status', nullable: true })
  @ApiProperty()
  mdhStatus: string;

  @Column({
    nullable: true,
    name: 'baselinesurveydate',
    comment: 'Baseline Survey Date',
  })
  @ApiPropertyOptional()
  baselineSurvey: Date;

  @Column({
    nullable: true,
    name: 'completed',
    comment: 'Baseline Survey Completed',
  })
  @ApiPropertyOptional()
  completed: Date;

  @Column({
    nullable: true,
    name: 'midlinehvlsample',
    comment: 'Midline HVL Sample',
  })
  @ApiPropertyOptional()
  midlineHvlSample: Date;

  @Column({
    nullable: true,
    name: 'midlinehvlresult',
    comment: 'Midline HVL Result',
  })
  @ApiPropertyOptional()
  midlineHvlResult: Date;

  @Column({
    nullable: true,
    name: 'endlinehvlsample',
    comment: 'Endline HVL Sample',
  })
  @ApiPropertyOptional()
  endlineHvlSample: Date;

  @Column({
    nullable: true,
    name: 'endlinehvlresult',
    comment: 'Endline HVL Result',
  })
  @ApiPropertyOptional()
  endlineHvlResult: Date;

  @Column({
    nullable: true,
    name: 'endlinesurvey',
    comment: 'Endline Survey Date',
  })
  @ApiPropertyOptional()
  endlineSurvey: Date;

  @Column({
    type: 'enum',
    enum: SAMPLESTATUS,
    default: SAMPLESTATUS['-'],
    name: 'midlinehvlstatus',
    comment: 'Midline HVL Result Status',
  })
  @ApiPropertyOptional({ enum: SAMPLESTATUS })
  midlineHvlStatus: SAMPLESTATUS;

  @Column({
    type: 'enum',
    enum: SURVEYSTATUS,
    default: SURVEYSTATUS.complete,
    name: 'baselinesurveystatus',
    comment: 'Baseline Survey Status',
  })
  @ApiPropertyOptional({ enum: SURVEYSTATUS })
  baselineSurveyStatus: SURVEYSTATUS;

  @Column({
    type: 'enum',
    enum: SURVEYSTATUS,
    default: SURVEYSTATUS.notReady,
    name: 'endlinesurveystatus',
    comment: 'Endline Survey Status',
  })
  @ApiPropertyOptional({ enum: SURVEYSTATUS })
  endlineSurveyStatus: SURVEYSTATUS;
}
