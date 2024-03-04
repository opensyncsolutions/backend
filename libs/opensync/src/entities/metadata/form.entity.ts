import { ApiPropertyOptional } from '@nestjs/swagger';
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { NameEntity } from '../general/named.entity';
import { Field } from './field.entity';
import { EnrollmentSection } from './enrollment.section.entity';

@Entity('form')
export class Form extends NameEntity {
  static plural = 'forms';
  static READ = 'READ_FORMS';
  static ADD = 'ADD_FORMS';
  static DELETE = 'DELETE_FORMS';
  static UPDATE = 'UPDATE_FORMS';

  @Column({ type: 'json', nullable: true })
  @ApiPropertyOptional()
  translations: any;

  @ManyToMany(() => Field, (field) => field, {
    nullable: false,
    cascade: true,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinTable({
    name: 'formfield',
    joinColumn: { referencedColumnName: 'id', name: 'form' },
    inverseJoinColumn: { referencedColumnName: 'id', name: 'field' },
  })
  @ApiPropertyOptional({ type: [Field] })
  fields: Field[];

  @OneToMany(() => EnrollmentSection, (section) => section.form, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  sections: EnrollmentSection[];
}
