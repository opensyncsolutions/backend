import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DB, schemaEntities } from '@app/rkpk';
import { AuthModule } from './modules/auth/auth.module';
import { OrganisationUnitModule } from './modules/organisationunit/organisationUnit.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      name: 'default',
      type: 'postgres',
      ...DB,
      entities: [...schemaEntities],
    }),
    AuthModule,
    OrganisationUnitModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
