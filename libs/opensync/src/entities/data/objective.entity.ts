import { Entity, JoinColumn, ManyToOne } from 'typeorm';
import { NameEntity } from '../general/named.entity';
import { OrganisationUnit } from '../metadata/organisationUnit.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('objective', { schema: 'public' })
export class Objective extends NameEntity {
  static plural = 'objectives';
  static READ = 'READ_OBJECTIVES';
  static ADD = 'ADD_OBJECTIVES';
  static DELETE = 'DELETE_OBJECTIVES';
  static UPDATE = 'UPDATE_OBJECTIVES';

  @ManyToOne(() => OrganisationUnit, (organisationUnit) => organisationUnit, {
    nullable: false,
    cascade: false,
    eager: false,
  })
  @JoinColumn({ name: 'ou', referencedColumnName: 'id' })
  @ApiProperty({ type: OrganisationUnit })
  organisationUnit: OrganisationUnit;
}
