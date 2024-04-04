import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Column } from 'typeorm';
import { DateEntity } from './date.entity';

export class NameEntity extends DateEntity {
  @Column({ comment: 'Name' })
  @ApiProperty()
  name: string;

  @Column({ nullable: true, comment: 'Description' })
  @ApiPropertyOptional({ nullable: true })
  description: string | null;
}
