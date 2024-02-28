import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
} from 'typeorm';
import { NameEntity } from '../general/named.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Enrollment, Field } from '..';

@Entity('stage')
export class EnrollmentStage extends NameEntity {
  static plural = 'stages';
  static READ = 'READ_STAGES';
  static ADD = 'ADD_STAGES';
  static DELETE = 'DELETE_STAGES';
  static UPDATE = 'UPDATE_STAGES';

  @Column({ nullable: true })
  @ApiPropertyOptional()
  sort: number;

  @ManyToMany(() => Field, (field) => field, {
    nullable: false,
    cascade: true,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinTable({
    name: 'stagefield',
    joinColumn: { referencedColumnName: 'id', name: 'stage' },
    inverseJoinColumn: { referencedColumnName: 'id', name: 'field' },
  })
  @ApiPropertyOptional({ type: [Field] })
  fields: Field[];

  @ManyToOne(() => Enrollment, (enrollment) => enrollment, {
    nullable: false,
    cascade: false,
    eager: false,
  })
  @JoinColumn({ name: 'enrollment', referencedColumnName: 'id' })
  @ApiProperty({ type: Enrollment })
  enrollment: Enrollment;
}
