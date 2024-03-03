import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';
import { NameEntity } from '../general/named.entity';

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
  options: any[];

  @Column()
  @ApiProperty()
  value: string;

  @Column({ default: false })
  @ApiPropertyOptional()
  mandatory: boolean;

  @Column()
  @ApiProperty()
  type: 'DATE' | 'TEXT' | 'LONG_TEXT' | 'BOOLEAN' | 'NUMBER';
}
