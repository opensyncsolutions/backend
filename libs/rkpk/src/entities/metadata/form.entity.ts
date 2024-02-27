import { Column, Entity, OneToMany } from 'typeorm';
import { NameEntity } from '../general/named.entity';
import { Field } from './field.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

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

  @OneToMany(() => Field, (field) => field.form, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @ApiProperty({ type: Field })
  fields: Field[];
}
