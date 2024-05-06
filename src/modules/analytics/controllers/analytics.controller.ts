import {
  EnrollmentAnalytics,
  PagerInterface,
  SessionGuard,
  pagerDetails,
  sanitizeResponse,
} from '@app/opensync';
import {
  Controller,
  Get,
  HttpStatus,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { EnrollmentAnalyticsService } from '../services/analytics.service';

@Controller(`api/${EnrollmentAnalytics.plural}`)
export class EnrollmentAnalyticsController {
  constructor(readonly service: EnrollmentAnalyticsService) {}

  @UseGuards(SessionGuard)
  @Get()
  async getMany(
    @Res() res: any,
    @Query() query: any,
    @Req() req: any,
  ): Promise<EnrollmentAnalytics> {
    const pager: PagerInterface = pagerDetails({
      page: query.page,
      pageSize: query.pageSize,
    });
    const record = await this.service.findMany({
      ...pager,
      fields: query.fields,
      filter: query.filter,
      order: query.order,
      rootJoin: query.rootJoin,
      user: req.session.user,
      include: query.include,
      userGroup: query.userGroup,
    });
    return res.status(HttpStatus.OK).send({
      ...record,
      [EnrollmentAnalytics.plural]: sanitizeResponse(
        record[EnrollmentAnalytics.plural],
        EnrollmentAnalytics.plural,
        query.fields,
        true,
      ),
    });
  }

  @Get('generate')
  generateAnalytics() {
    this.service.generateAnalytics();
  }
}
