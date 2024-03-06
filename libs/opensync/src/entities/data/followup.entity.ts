import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { NameEntity } from '../general/named.entity';
import { Enrollment } from './enrollment.entity';

@Entity('followup')
export class Followup extends NameEntity {
  static plural = 'followups';
  static READ = 'READ_FOLLOWUPS';
  static ADD = 'ADD_FOLLOWUPS';
  static DELETE = 'DELETE_FOLLOWUPS';
  static UPDATE = 'UPDATE_FOLLOWUPS';

  @OneToOne(() => Enrollment, (enrollment) => enrollment.followup, {
    nullable: false,
  })
  @JoinColumn({ name: 'enrollment' })
  enrollment: Enrollment;

  @Column({ name: 'nextvisit', nullable: true })
  nextVisit: Date;

  @Column({ name: 'firstreturn', nullable: true })
  firstReturn: Date;

  @Column({ name: 'phonenumber', nullable: true })
  phoneNumber: string;

  @Column({ name: 'alternativephonenumber', nullable: true })
  alternativePhoneNumber: string;
}
