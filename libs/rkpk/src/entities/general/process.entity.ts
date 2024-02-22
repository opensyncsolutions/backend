import { Column, Entity } from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { NameEntity } from './named.entity';

@Entity('process', { schema: 'public' })
export class Process extends NameEntity {
  static plural = 'processes';
  static READ = 'READ_PROCESSES';
  static ADD = 'ADD_PROCESSES';
  static DELETE = 'DELETE_PROCESSES';
  static UPDATE = 'UPDATE_PROCESSES';

  @Column()
  @ApiProperty()
  script: string;

  @Column({ name: 'param', type: 'json', nullable: true })
  @ApiPropertyOptional()
  params: any[];

  @Column({ default: false })
  @ApiPropertyOptional()
  download: boolean;

  @Column({ unique: true })
  @ApiPropertyOptional()
  code: string;
}
