import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DB, schemaEntities } from '@app/rkpk';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      name: 'default',
      type: 'postgres',
      ...DB,
      entities: [...schemaEntities],
    }),
    AuthModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
