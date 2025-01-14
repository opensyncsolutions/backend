import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OrganisationUnit } from '../metadata/organisationUnit.entity';

@Entity('enrollmentanalytics')
export class EnrollmentAnalytics extends BaseEntity {
  static plural = 'enrollmentAnalytics';
  static READ = 'READ_ENROLLMENTANALYTICS';
  static ADD = '';
  static DELETE = '';
  static UPDATE = '';

  @PrimaryGeneratedColumn('uuid')
  @ApiPropertyOptional()
  id: string;

  @CreateDateColumn()
  @ApiPropertyOptional()
  created: Date;

  @UpdateDateColumn()
  @ApiPropertyOptional()
  updated: Date;

  @Column()
  enrollments: number;

  @Column({ comment: 'Eligible' })
  eligible: number;

  @Column({ comment: 'Non-Eligible' })
  non: number;

  @OneToOne(() => OrganisationUnit, (organisationUnit) => organisationUnit, {})
  @JoinColumn({ name: 'ou' })
  organisationUnit: OrganisationUnit;
}
