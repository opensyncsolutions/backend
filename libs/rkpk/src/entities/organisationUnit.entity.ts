import {
  BeforeInsert,
  Column,
  Entity,
  Tree,
  TreeChildren,
  TreeParent,
} from 'typeorm';
import { NameEntity } from './named.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BadRequestException } from '@nestjs/common';

@Entity('organisationunit')
@Tree('closure-table')
export class OrganisationUnit extends NameEntity {
  static plural = 'organisationUnits';
  @Column({ name: 'shortname' })
  @ApiProperty()
  shortName: string;

  @Column({ name: 'openingdate', default: '1970-01-01' })
  @ApiPropertyOptional()
  openingDate: Date;

  @Column({ default: true })
  @ApiPropertyOptional()
  active: boolean;

  @Column()
  @ApiPropertyOptional()
  level: number;

  @TreeChildren()
  @ApiPropertyOptional()
  children: OrganisationUnit[];

  @TreeParent()
  @ApiPropertyOptional()
  parent: OrganisationUnit;

  @BeforeInsert()
  async beforeInsertTransaction() {
    if (!this.level || this.level > 1) {
      const parent = await OrganisationUnit.findOne({
        where: { id: this.parent?.id },
      });

      if (!parent)
        throw new BadRequestException('Missing organisationUnit parent');

      this.level = parent.level + 1;
    }
  }

  static createTree = async (organisationUnit: any) => {
    try {
      const ancestor = await OrganisationUnit.findOne({
        where: { id: organisationUnit.id },
      });
      if (!ancestor) {
        await OrganisationUnit.save(organisationUnit);
      }
    } catch (e) {}
  };
}
