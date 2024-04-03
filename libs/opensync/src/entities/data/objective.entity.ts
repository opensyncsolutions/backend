import { BadRequestException, NotFoundException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { BeforeInsert, Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { throwError } from '../../helpers';
import { NameEntity } from '../general/named.entity';
import { OrganisationUnit } from '../metadata/organisationUnit.entity';

@Entity('objective', { schema: 'public' })
export class Objective extends NameEntity {
  static plural = 'objectives';
  static READ = 'READ_OBJECTIVES';
  static ADD = 'ADD_OBJECTIVES';
  static DELETE = 'DELETE_OBJECTIVES';
  static UPDATE = 'UPDATE_OBJECTIVES';

  @Column({ nullable: true })
  enrollments: number;

  @ManyToMany(() => OrganisationUnit, (organisationUnit) => organisationUnit, {
    nullable: false,
    cascade: true,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinTable({
    name: 'ojectivelocation',
    joinColumn: { referencedColumnName: 'id', name: 'objective' },
    inverseJoinColumn: { referencedColumnName: 'id', name: 'ou' },
  })
  @ApiProperty()
  organisationUnits: OrganisationUnit[];

  @BeforeInsert()
  async beforeInsert() {
    if (!this.organisationUnits?.length) {
      throwError(new NotFoundException('Organisation Units cannot be null'));
    }
    let messages = [];
    for (const organisationUnit of this.organisationUnits) {
      const ou = await OrganisationUnit.findOne({
        where: { id: organisationUnit?.id },
      });
      if (!ou) {
        messages = [
          ...messages,
          `Organisation Unit with ID ${organisationUnit.id} could not be found`,
        ];
      }
      if (!ou?.active) {
        messages = [
          ...messages,
          `Organisation Unit with ID ${organisationUnit.id} is not active`,
        ];
      }
    }
    if (messages?.length) {
      throwError(new BadRequestException(messages?.join(', ')));
    }
  }
}
