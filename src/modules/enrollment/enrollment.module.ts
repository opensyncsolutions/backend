import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  Disbursement,
  Enrollment,
  EnrollmentStage,
  Followup,
} from '@app/opensync';
import { EnrollmentController } from './controllers/enrollment.controller';
import { EnrollmentService } from './services/enrollment.service';
import { EnrollmentStageController } from './controllers/enrollmentstage.controller';
import { EnrollmentStageService } from './services/enrollmentstage.service';
import { FollowupController } from './controllers/followup.controller';
import { FollowupService } from './services/followup.service';
import { DisbursementController } from './controllers/disbursement.controller';
import { DisbursementService } from './services/disbursement.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Enrollment,
      EnrollmentStage,
      Followup,
      Disbursement,
    ]),
  ],
  controllers: [
    EnrollmentController,
    EnrollmentStageController,
    FollowupController,
    DisbursementController,
  ],
  providers: [
    EnrollmentService,
    EnrollmentStageService,
    FollowupService,
    DisbursementService,
  ],
})
export class EnrollmentModule {}
