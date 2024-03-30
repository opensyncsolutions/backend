import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  BloodCollection,
  DataCollection,
  Disbursement,
  Eac,
  EacSession,
  Enrollment,
  Followup,
} from '@app/opensync';
import { EnrollmentController } from './controllers/enrollment.controller';
import { EnrollmentService } from './services/enrollment.service';
import { FollowupController } from './controllers/followup.controller';
import { FollowupService } from './services/followup.service';
import { DisbursementController } from './controllers/disbursement.controller';
import { DisbursementService } from './services/disbursement.service';
import { BloodCollectionController } from './controllers/bloodcollection.controller';
import { BloodCollectionService } from './services/bloodcollection.service';
import { DataCollectionController } from './controllers/datacollection.controller';
import { DataCollectionService } from './services/datacollection.service';
import { EacController } from './controllers/eac.controller';
import { EacService } from './services/eac.service';
import { EacSessionController } from './controllers/eacsession.controller';
import { EacSessionService } from './services/eacsession.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Enrollment,
      Followup,
      Disbursement,
      BloodCollection,
      DataCollection,
      Eac,
      EacSession,
    ]),
  ],
  controllers: [
    EnrollmentController,
    FollowupController,
    DisbursementController,
    BloodCollectionController,
    DataCollectionController,
    EacController,
    EacSessionController,
  ],
  providers: [
    EnrollmentService,
    FollowupService,
    DisbursementService,
    BloodCollectionService,
    DataCollectionService,
    EacService,
    EacSessionService,
  ],
})
export class EnrollmentModule {}
