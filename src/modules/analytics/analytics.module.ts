import { EnrollmentAnalytics } from '@app/opensync';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnrollmentAnalyticsController } from './controllers/analytics.controller';
import { EnrollmentAnalyticsService } from './services/analytics.service';

@Module({
  imports: [TypeOrmModule.forFeature([EnrollmentAnalytics])],
  controllers: [EnrollmentAnalyticsController],
  providers: [EnrollmentAnalyticsService],
})
export class EnrollmentAnalyticsModule {}
