import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  BaseEntity,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class DateEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiPropertyOptional()
  id: string;

  @CreateDateColumn()
  @ApiPropertyOptional()
  created: Date;

  @UpdateDateColumn()
  @ApiPropertyOptional()
  updated: Date;
}
