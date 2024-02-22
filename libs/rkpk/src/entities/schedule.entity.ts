import { Column, CreateDateColumn, Entity, UpdateDateColumn } from 'typeorm';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { NameEntity } from './named.entity';

@Entity('schedule', { schema: 'public' })
export class Schedule extends NameEntity {
  static plural = 'schedules';

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
