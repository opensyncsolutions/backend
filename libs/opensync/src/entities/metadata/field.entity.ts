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

  @Column({ default: false })
  @ApiPropertyOptional()
  mandatory: boolean;

  @Column({ nullable: true, name: 'sortorder' })
  @ApiPropertyOptional()
  sortOrder: number;

  @Column({ type: 'enum', enum: FIELDTYPE })
  @ApiProperty()
  type: FIELDTYPE;
}
