import { Menu } from '@app/opensync';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([Menu])],
  controllers: [AppController],
  providers: [AppService],
})
export class OpenSyncAppModule {}
