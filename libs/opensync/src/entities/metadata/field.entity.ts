import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';
import { NameEntity } from '../general/named.entity';
import { FIELDTYPE } from '../../enums/enrollment.enum';

@Entity('field')
export class Field extends NameEntity {
  static plural = 'fields';
  static READ = 'READ_FIELDS';
  static ADD = 'ADD_FIELDS';
  static DELETE = 'DELETE_FIELDS';
  static UPDATE = 'UPDATE_FIELDS';

  @Column({ type: 'json', nullable: true })
  @ApiPropertyOptional()
  translations: any[];

  @Column({ type: 'json', nullable: true })
  @ApiPropertyOptional()
  options: any;

  @Column()
  @ApiProperty()
  value: string;

  @Column({ nullable: true, name: 'futuredate' })
  @ApiProperty()
  futureDate: boolean;

  @Column({ nullable: true, comment: 'Optional Field Validation' })
  @ApiProperty()
  validation: string;

  @Column({ nullable: true, comment: 'Display Field In List' })
  @ApiProperty()
  displayInList: boolean;

  @Column({ default: false, comment: 'Is The Field Mandatory' })
  @ApiPropertyOptional()
  mandatory: boolean;

  @Column({ nullable: true, name: 'sortorder' })
  @ApiPropertyOptional()
  sortOrder: number;

  @Column({ type: 'enum', enum: FIELDTYPE, comment: 'Field Type' })
  @ApiProperty()
  type: FIELDTYPE;
}
