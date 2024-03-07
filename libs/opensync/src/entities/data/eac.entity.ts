import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { DateEntity } from '../general/date.entity';
import { Enrollment } from './enrollment.entity';
import { EacSession } from './session.entity';

@Entity('eac')
export class Eac extends DateEntity {
  static plural = 'eacs';
  static READ = 'READ_EACS';
  static ADD = 'ADD_EACS';
  static DELETE = 'DELETE_EACS';
  static UPDATE = 'UPDATE_EACS';

  @ManyToOne(() => Enrollment, (enrollment) => enrollment.disbursements, {
    nullable: true,
  })
  @JoinColumn({ name: 'enrollment' })
  @ApiProperty({ type: Enrollment })
  enrollment: Enrollment;

  @Column({ nullable: true, name: 'sessiondate', comment: 'Session Date' })
  @ApiPropertyOptional()
  sessionDate: Date;

  @Column({ default: false, comment: 'Information Verified?' })
  @ApiPropertyOptional()
  verified: boolean;

  @Column({ default: false, comment: 'Is Mother Name Correct?' })
  @ApiPropertyOptional()
  correctMotherName: boolean;

  @Column({ nullable: true, name: 'control', comment: 'Comment Date' })
  @ApiPropertyOptional()
  controlDate: Date;

  @Column({
    nullable: true,
    name: 'intervention',
    comment: 'Intervention Date',
  })
  @ApiPropertyOptional()
  interventionDate: Date;

  @Column({ nullable: true, name: 'contactstill', comment: 'Still Contact?' })
  @ApiPropertyOptional()
  contactStill: boolean;

  @OneToMany(() => EacSession, (session) => session.eac, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @ApiPropertyOptional({ type: [EacSession] })
  sessions: EacSession[];

  @BeforeInsert()
  beforeInsert() {
    if (this.sessions?.length > 0) {
      const id = this.id || uuidv4();
      this.id = id;
      this.sessions = this.sessions.map((session) => {
        return { ...session, enrollment: { id } } as unknown as EacSession;
      });
    }
  }
}
