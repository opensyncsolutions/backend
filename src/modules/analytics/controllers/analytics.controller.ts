import { SharedController, EnrollmentAnalytics } from '@app/opensync';
import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { EnrollmentAnalyticsService } from '../services/analytics.service';

@Controller(`api/${EnrollmentAnalytics.plural}`)
export class EnrollmentAnalyticsController extends SharedController<EnrollmentAnalytics> {
  constructor(readonly service: EnrollmentAnalyticsService) {
    super(service);
  }

  @Get('generate')
  generateAnalytics() {
    this.service.generateAnalytics();
  }

  @Post()
  post() {}

  @Put(':id')
  update() {}

  @Delete(':id')
  delete() {}
}
