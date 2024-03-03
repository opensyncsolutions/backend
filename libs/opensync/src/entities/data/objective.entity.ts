import { BeforeInsert, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { NameEntity } from '../general/named.entity';
import { OrganisationUnit } from '../metadata/organisationUnit.entity';
import { ApiProperty } from '@nestjs/swagger';
import { throwError } from '../../helpers';
import { NotFoundException } from '@nestjs/common';

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

  @BeforeInsert()
  async beforeInsert() {
    if (!this.organisationUnit?.id) {
      throwError(new NotFoundException('Organisation Unit cannot be null'));
    }

    const ou = await OrganisationUnit.findOne({
      where: { id: this.organisationUnit?.id },
    });

    if (!ou) {
      throwError(new NotFoundException('Organisation Unit could not be found'));
    }

    if (!ou.data || !ou.active) {
      throwError(
        new NotFoundException(
          `Organisation Unit ${!ou.data ? 'does not allow data entry' : 'is not currently active for data entry'}`,
        ),
      );
    }
  }
}
