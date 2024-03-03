import { Phone } from '@app/opensync';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhoneController } from './controllers/phone.controller';
import { PhoneService } from './services/phone.service';

@Module({
  imports: [TypeOrmModule.forFeature([Phone])],
  controllers: [PhoneController],
  providers: [PhoneService],
})
export class PhoneModule {}
