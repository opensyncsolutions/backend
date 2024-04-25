import {
  BeforeInsert,
  Column,
  Entity,
  Tree,
  TreeChildren,
  TreeParent,
} from 'typeorm';
import { NameEntity } from '../general/named.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BadRequestException } from '@nestjs/common';
import { APPENV } from '../..';
import { v4 as uuidv4 } from 'uuid';

@Entity('organisationunit')
@Tree('closure-table')
export class OrganisationUnit extends NameEntity {
  static plural = 'organisationUnits';
  static READ = 'READ_ORGANISATIONUNITS';
  static ADD = 'ADD_ORGANISATIONUNITS';
  static DELETE = 'DELETE_ORGANISATIONUNITS';
  static UPDATE = 'UPDATE_ORGANISATIONUNITS';

  @Column({ name: 'shortname', comment: 'Short Name' })
  @ApiProperty()
  shortName: string;

  @Column()
  @ApiProperty()
  path: string;

  @Column({
    name: 'openingdate',
    default: '1970-01-01',
    comment: 'Opening Date',
  })
  @ApiPropertyOptional()
  openingDate: Date;

  @Column({ default: true, comment: 'Active' })
  @ApiPropertyOptional()
  active: boolean;

  @Column({ comment: 'Level' })
  @ApiPropertyOptional()
  level: number;

  @Column({ default: false, comment: 'Allow Data Entry?' })
  @ApiPropertyOptional()
  data: boolean;

  @TreeChildren()
  @ApiPropertyOptional({ type: [OrganisationUnit] })
  children: OrganisationUnit[];

  @TreeParent()
  @ApiProperty({ type: OrganisationUnit })
  parent: OrganisationUnit;

  @BeforeInsert()
  async beforeInsertTransaction() {
    if (!this.parent?.id && !APPENV.ALLOWROOTS) {
      throw new BadRequestException('Missing organisationUnit parent');
    }

    this.id = this.id || uuidv4();
    this.path = this.id;
    if (!this.shortName) {
      this.shortName = this.name;
    }

    if ((!this.level || this.level > 1) && !APPENV.ALLOWROOTS) {
      const parent = await OrganisationUnit.findOne({
        where: { id: this.parent?.id },
      });

      if (!parent)
        throw new BadRequestException('Missing organisationUnit parent');

      this.level = parent.level + 1;
      this.path = `${parent.path}/${this.id}`;
    }

    if (!this.parent?.id && APPENV.ALLOWROOTS) {
      this.level = 1;
    }

    if (this.parent?.id && !this.level) {
      const parent = await OrganisationUnit.findOne({
        where: { id: this.parent?.id },
      });

      if (!parent)
        throw new BadRequestException('Missing organisationUnit parent');
      this.level = parent.level + 1;
      this.path = `${parent.path}/${this.id}`;
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
