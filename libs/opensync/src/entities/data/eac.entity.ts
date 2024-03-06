import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
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
  enrollment: Enrollment;

  @Column({ nullable: true, name: 'sessiondate' })
  sessionDate: Date;

  @Column({ nullable: true, name: 'control' })
  controlDate: Date;

  @Column({ nullable: true, name: 'intervention' })
  interventionDate: Date;

  @Column({ nullable: true, name: 'contactstill' })
  contactStill: boolean;

  @OneToMany(() => EacSession, (session) => session.eac, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  sessions: EacSession[];
}
