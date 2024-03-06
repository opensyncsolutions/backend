import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { DateEntity } from '../general/date.entity';
import { Enrollment } from './enrollment.entity';

@Entity('bloodCollection')
export class BloodCollection extends DateEntity {
  static plural = 'bloodCollections';
  static READ = 'READ_BLOODCOLLECTIONS';
  static ADD = 'ADD_BLOODCOLLECTIONS';
  static DELETE = 'DELETE_BLOODCOLLECTIONS';
  static UPDATE = 'UPDATE_BLOODCOLLECTIONS';

  @ManyToOne(() => Enrollment, (enrollment) => enrollment.bloodCollections, {
    nullable: false,
  })
  @JoinColumn({ name: 'enrollment' })
  enrollment: Enrollment;

  @Column({ nullable: true })
  mdhCollection: string;

  @Column({ nullable: true })
  result: string;

  @Column({ nullable: true })
  resultDate: Date;
}
