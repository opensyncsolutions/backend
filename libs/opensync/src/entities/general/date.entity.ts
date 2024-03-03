import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../auth/user.entity';

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

  @DeleteDateColumn()
  @ApiPropertyOptional()
  deleted: Date;

  @Column({ nullable: true, unique: true })
  @ApiPropertyOptional()
  code: string;

  @ManyToOne(() => User, (user) => user, {
    nullable: true,
    cascade: false,
    eager: false,
  })
  @JoinColumn({ name: 'creator', referencedColumnName: 'id' })
  @ApiPropertyOptional({ type: User, nullable: true })
  createdBy: User;

  @ManyToOne(() => User, (user) => user, {
    nullable: true,
    cascade: false,
    eager: false,
  })
  @JoinColumn({ name: 'updator', referencedColumnName: 'id' })
  @ApiPropertyOptional({ type: User, nullable: true })
  updatedBy: User;
}
