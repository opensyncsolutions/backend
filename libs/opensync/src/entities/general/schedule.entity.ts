import { Column, CreateDateColumn, Entity, UpdateDateColumn } from 'typeorm';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { NameEntity } from './named.entity';

@Entity('schedule', { schema: 'public' })
export class Schedule extends NameEntity {
  static plural = 'schedules';
  static READ = 'READ_SCHEDULES';
  static ADD = 'ADD_SCHEDULES';
  static DELETE = 'DELETE_SCHEDULES';
  static UPDATE = 'UPDATE_SCHEDULES';

  @Column({ name: 'log', type: 'json' })
  @ApiPropertyOptional()
  logs: any[];

  @CreateDateColumn()
  @ApiPropertyOptional()
  started: Date | null;

  @UpdateDateColumn()
  @ApiPropertyOptional()
  ended: Date | null;
}
