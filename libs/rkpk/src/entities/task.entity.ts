import { Column, CreateDateColumn, Entity, UpdateDateColumn } from 'typeorm';
import { LogDetails } from '../interfaces';
import { NameEntity } from './named.entity';
import { ApiPropertyOptional } from '@nestjs/swagger';

@Entity('task', { schema: 'public' })
export class Task extends NameEntity {
  static plural = 'tasks';

  @Column({ default: 'STARTED' })
  @ApiPropertyOptional()
  status: string;

  @Column({ name: 'log', type: 'json' })
  @ApiPropertyOptional()
  logs: LogDetails[];

  @CreateDateColumn()
  @ApiPropertyOptional()
  started: Date | null;

  @UpdateDateColumn()
  @ApiPropertyOptional()
  ended: Date | null;
}
