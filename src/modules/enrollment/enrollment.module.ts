import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Enrollment, EnrollmentStage } from '@app/opensync';
import { EnrollmentController } from './controllers/enrollment.controller';
import { EnrollmentService } from './services/enrollment.service';
import { EnrollmentStageController } from './controllers/enrollmentstage.controller';
import { EnrollmentStageService } from './services/enrollmentstage.service';

@Module({
  imports: [TypeOrmModule.forFeature([Enrollment, EnrollmentStage])],
  controllers: [EnrollmentController, EnrollmentStageController],
  providers: [EnrollmentService, EnrollmentStageService],
})
export class EnrollmentModule {}
