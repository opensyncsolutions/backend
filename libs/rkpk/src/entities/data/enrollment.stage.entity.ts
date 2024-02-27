import { Entity } from 'typeorm';
import { DateEntity } from '../general/date.entity';

@Entity('stage')
export class EnrollmentStage extends DateEntity {}
