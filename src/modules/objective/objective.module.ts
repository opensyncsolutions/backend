import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Objective } from '@app/opensync';
import { ObjectiveController } from './controllers/objective.controller';
import { ObjectiveService } from './services/objective.service';

@Module({
  imports: [TypeOrmModule.forFeature([Objective])],
  controllers: [ObjectiveController],
  providers: [ObjectiveService],
})
export class ObjectiveModule {}
