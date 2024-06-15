import {
  BadRequestError,
  EnrollmentAnalytics,
  GetMany,
  InternalServerError,
  PagerInterface,
  SessionGuard,
  UnauthorizedError,
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
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Enrollment Analytics')
@Controller(`api/${EnrollmentAnalytics.plural}`)
export class EnrollmentAnalyticsController {
  constructor(readonly service: EnrollmentAnalyticsService) {}

  @UseGuards(SessionGuard)
  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successful Response',
    type: GetMany,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
    type: UnauthorizedError,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad Request',
    type: BadRequestError,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
    type: InternalServerError,
  })
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
