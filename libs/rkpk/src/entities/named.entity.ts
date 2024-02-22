import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Column } from 'typeorm';
import { DateEntity } from './date.entity';

export class NameEntity extends DateEntity {
  @Column()
  @ApiProperty()
  name: string;

  @Column({ nullable: true })
  @ApiPropertyOptional({ nullable: true })
  description: string | null;
}
