import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganisationUnit } from '@app/rkpk';
import { OrganisationUnitController } from './controllers/organisationunit.controller';
import { OrganisationUnitService } from './services/organisationunit.service';

@Module({
  imports: [TypeOrmModule.forFeature([OrganisationUnit])],
  controllers: [OrganisationUnitController],
  providers: [OrganisationUnitService],
})
export class OrganisationUnitModule {}
