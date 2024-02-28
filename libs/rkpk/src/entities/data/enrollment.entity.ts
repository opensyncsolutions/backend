import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { DateEntity } from '../general/date.entity';
import { Objective } from './objective.entity';
import { EnrollmentStage, Field } from '..';

@Entity('enrollment', { schema: 'public' })
export class Enrollment extends DateEntity {
  static plural = 'enrollments';
  static READ = 'READ_ENROLLMENTS';
  static ADD = 'ADD_ENROLLMENTS';
  static DELETE = 'DELETE_ENROLLMENTS';
  static UPDATE = 'UPDATE_ENROLLMENTS';

  @Column({ default: 'CONTROL' })
  status: 'CONTROL' | 'INTERVENTION';

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
}
