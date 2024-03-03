import { Network } from '@app/rkpk';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NetworkController } from './controllers/network.controller';
import { NetworkService } from './services/network.service';

@Module({
  imports: [TypeOrmModule.forFeature([Network])],
  controllers: [NetworkController],
  providers: [NetworkService],
})
export class NetworkModule {}
