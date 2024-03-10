import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
} from 'typeorm';
import { Field, Form } from '..';
import { DateEntity } from '../general/date.entity';

@Entity('section')
export class Section extends DateEntity {
  static plural = 'sections';
  static READ = 'READ_SECTIONS';
  static ADD = 'ADD_SECTIONS';
  static DELETE = 'DELETE_SECTIONS';
  static UPDATE = 'UPDATE_SECTIONS';

  @Column({ type: 'json', nullable: true })
  @ApiPropertyOptional()
  translations: any;

  @Column({ nullable: true, name: 'sortorder' })
  @ApiPropertyOptional()
  sortOrder: number;

  @ManyToOne(() => Form, (form) => form.sections, {
    nullable: false,
    cascade: false,
    eager: false,
  })
  @JoinColumn({ name: 'form', referencedColumnName: 'id' })
  @ApiProperty({ type: Form })
  form: Form;

  @ManyToMany(() => Field, (field) => field, {
    nullable: false,
    cascade: true,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinTable({
    name: 'sectionfield',
    joinColumn: { referencedColumnName: 'id', name: 'section' },
    inverseJoinColumn: { referencedColumnName: 'id', name: 'field' },
  })
  @ApiPropertyOptional({ type: [Field] })
  fields: Field[];
}
