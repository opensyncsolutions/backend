import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Enrollment, EnrollmentStage, Followup } from '@app/opensync';
import { EnrollmentController } from './controllers/enrollment.controller';
import { EnrollmentService } from './services/enrollment.service';
import { EnrollmentStageController } from './controllers/enrollmentstage.controller';
import { EnrollmentStageService } from './services/enrollmentstage.service';
import { FollowupController } from './controllers/followup.controller';
import { FollowupService } from './services/followup.service';

@Module({
  imports: [TypeOrmModule.forFeature([Enrollment, EnrollmentStage, Followup])],
  controllers: [
    EnrollmentController,
    EnrollmentStageController,
    FollowupController,
  ],
  providers: [EnrollmentService, EnrollmentStageService, FollowupService],
})
export class EnrollmentModule {}
