import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CLIENT, DB, schemaEntities } from '@app/rkpk';
import { AuthModule } from './modules/auth/auth.module';
import { OrganisationUnitModule } from './modules/organisationunit/organisationUnit.module';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { EnrollmentModule } from './modules/enrollment/enrollment.module';
import { ObjectiveModule } from './modules/objective/objective.module';
import { FormModule } from './modules/form/form.module';
import { PhoneModule } from './modules/phone/phone.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', CLIENT),
    }),
    TypeOrmModule.forRoot({
      name: 'default',
      type: 'postgres',
      ...DB,
      entities: [...schemaEntities],
    }),
    AuthModule,
    OrganisationUnitModule,
    EnrollmentModule,
    ObjectiveModule,
    FormModule,
    PhoneModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
