import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Eac } from './eac.entity';
import { SESSIONNUMBER } from '../../enums/enrollment.enum';

@Entity('session')
@Index('unique_session', ['session', 'eac.id'], { unique: true })
export class EacSession extends BaseEntity {
  static plural = 'sessions';
  static READ: string = 'READ_SESSIONS';
  static ADD: string = 'ADD_SESSIONS';
  static DELETE: string = 'DELETE_SESSIONS';
  static UPDATE: string = 'UPDATE_SESSIONS';

  @PrimaryGeneratedColumn('uuid')
  @ApiPropertyOptional()
  id: string;

  @Column({ type: 'enum', enum: SESSIONNUMBER })
  @ApiProperty()
  session: SESSIONNUMBER;

  @CreateDateColumn()
  @ApiPropertyOptional()
  created: Date;

  @ManyToOne(() => Eac, (eac) => eac, {
    nullable: false,
    cascade: false,
  })
  @JoinColumn({ name: 'eac', referencedColumnName: 'id' })
  @ApiProperty({ type: Eac })
  eac: Eac;
}
