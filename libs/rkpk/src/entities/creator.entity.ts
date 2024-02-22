import { ApiPropertyOptional } from '@nestjs/swagger';
import { JoinColumn, ManyToOne } from 'typeorm';
import { DateEntity } from './date.entity';
import { User } from './user.entity';

export class Owner extends DateEntity {
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
