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

  @Column()
  @ApiProperty()
  mdhStatus: string;

  @Column({ nullable: true, name: 'baselinesurveydate' })
  @ApiPropertyOptional()
  baselineSurveyReadyDate: Date;

  @Column({ nullable: true, name: 'baselinesurveycompleteddate' })
  @ApiPropertyOptional()
  baselineSurveyCompletedDate: Date;

  @Column({ nullable: true, name: 'midlinehvlsamplereadydate' })
  @ApiPropertyOptional()
  midlineHvlSampleReadyDate: Date;

  @Column({ nullable: true, name: 'midlinehvlsampledate' })
  @ApiPropertyOptional()
  midlineHvlSampleDate: Date;

  @Column({ nullable: true, name: 'midlinehvlresultreadydate' })
  @ApiPropertyOptional()
  midlineHvlResultReadyDate: Date;

  @Column({ nullable: true, name: 'midlinehvlresultdate' })
  @ApiPropertyOptional()
  midlineHvlResultDate: Date;

  @Column({ nullable: true, name: 'endlinesurveyreadydate' })
  @ApiPropertyOptional()
  endlineSurveyReadyDate: Date;

  @Column({ nullable: true, name: 'endlinesurveydate' })
  @ApiPropertyOptional()
  endlineSurveyDate: Date;

  @Column({
    type: 'enum',
    enum: SAMPLESTATUS,
    default: SAMPLESTATUS['-'],
    name: 'midlinehvlresultstatus',
  })
  @ApiPropertyOptional({ enum: SAMPLESTATUS })
  midlineHvlResultStatus: SAMPLESTATUS;

  @Column({
    type: 'enum',
    enum: SURVEYSTATUS,
    default: SURVEYSTATUS.complete,
    name: 'baselinesurveystatus',
  })
  @ApiPropertyOptional({ enum: SURVEYSTATUS })
  baselineSurveyStatus: SURVEYSTATUS;

  @Column({
    type: 'enum',
    enum: SURVEYSTATUS,
    default: SURVEYSTATUS.notReady,
    name: 'endlinesurveystatus',
  })
  @ApiPropertyOptional({ enum: SURVEYSTATUS })
  endlineSurveyStatus: SURVEYSTATUS;

  @Column({
    type: 'enum',
    enum: SURVEYSTATUS,
    default: SURVEYSTATUS.notReady,
    name: 'midlinehvlsamplestatus',
  })
  @ApiPropertyOptional({ enum: SURVEYSTATUS })
  midlineHvlSampleStatus: SURVEYSTATUS;
}

/*
{
                "baseline_survey": "OVERDUE",
                "baseline_survey_date": null,
                "endline_hvl_sample": "NOT READY",
                "endline_hvl_sample_date": null,
                "endline_survey": "NOT READY",
                "endline_survey_date": null,
                "endline_hvl_result": "-",
                "endline_hvl_result_date": null,
                "mdh_status": null,
                "check_in_phone_call": null,
                "enrollment_date": null,
                "clinic": {
                    "id": "0097ff83-f290-4a87-b891-feb017b162c0",
                    "name": "Geita Regional Referral Hospital"
                }
            }
*/
