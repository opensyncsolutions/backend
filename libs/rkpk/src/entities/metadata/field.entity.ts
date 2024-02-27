import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { NameEntity } from '../general/named.entity';
import { Form } from './form.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Entity('field')
export class Field extends NameEntity {
  static plural = 'fields';
  static READ = 'READ_FIELDS';
  static ADD = 'ADD_FIELDS';
  static DELETE = 'DELETE_FIELDS';
  static UPDATE = 'UPDATE_FIELDS';

  @Column({ type: 'json', nullable: true })
  @ApiPropertyOptional()
  translations: any;

  @Column()
  @ApiProperty()
  value: string;

  @Column({ default: false })
  @ApiPropertyOptional()
  mandatory: boolean;

  @Column()
  @ApiProperty()
  type: string;

  @ManyToOne(() => Form, (form) => form, {
    nullable: false,
    cascade: false,
    eager: false,
  })
  @JoinColumn({ name: 'form', referencedColumnName: 'id' })
  @ApiProperty({ type: Form })
  form: Form;
}
