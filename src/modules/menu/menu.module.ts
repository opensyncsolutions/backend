import { Menu } from '@app/opensync';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuController } from './controllers/menu.controller';
import { MenuService } from './services/menu.service';

@Module({
  imports: [TypeOrmModule.forFeature([Menu])],
  controllers: [MenuController],
  providers: [MenuService],
})
export class MenuModule {}
