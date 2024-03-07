import { CLIENT, DB, schemaEntities } from '@app/opensync';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { EnrollmentModule } from './modules/enrollment/enrollment.module';
import { FormModule } from './modules/form/form.module';
import { NetworkModule } from './modules/network/network.module';
import { ObjectiveModule } from './modules/objective/objective.module';
import { OrganisationUnitModule } from './modules/organisationunit/organisationUnit.module';
import { PhoneModule } from './modules/phone/phone.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: CLIENT,
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
    NetworkModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
