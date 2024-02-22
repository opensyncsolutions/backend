import { Column, Entity } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { NameEntity } from './named.entity';

@Entity('process', { schema: 'public' })
export class Process extends NameEntity {
  static plural = 'processes';
  @Column('text', {
    nullable: false,
  })
  @ApiProperty({ nullable: false })
  script: string;

  @Column({ name: 'param', type: 'json', nullable: true })
  params: any[];

  @Column({ default: false })
  download: boolean;

  @Column({ unique: true })
  code: string;
}
