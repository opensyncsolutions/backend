import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  BloodCollection,
  DataCollection,
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
import { BloodCollectionController } from './controllers/bloodcollection.controller';
import { BloodCollectionService } from './services/bloodcollection.service';
import { DataCollectionController } from './controllers/datacollection.controller';
import { DataCollectionService } from './services/datacollection.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Enrollment,
      EnrollmentStage,
      Followup,
      Disbursement,
      BloodCollection,
      DataCollection,
    ]),
  ],
  controllers: [
    EnrollmentController,
    EnrollmentStageController,
    FollowupController,
    DisbursementController,
    BloodCollectionController,
    DataCollectionController,
  ],
  providers: [
    EnrollmentService,
    EnrollmentStageService,
    FollowupService,
    DisbursementService,
    BloodCollectionService,
    DataCollectionService,
  ],
})
export class EnrollmentModule {}
