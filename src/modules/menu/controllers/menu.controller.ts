import {
  BadRequestError,
  InternalServerError,
  Menu,
  NotFoundError,
  SessionGuard,
  SharedController,
  UnauthorizedError,
  errorSanitizer,
  sanitizeResponse,
} from '@app/opensync';
import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { MenuService } from '../services/menu.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Menus')
@Controller(`api/${Menu.plural}`)
export class MenuController extends SharedController<Menu> {
  constructor(readonly service: MenuService) {
    super(service);
  }

  @UseGuards(SessionGuard)
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Successful Response',
    type: Menu,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad Request',
    type: BadRequestError,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
    type: UnauthorizedError,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Record Not Found',
    type: NotFoundError,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
    type: InternalServerError,
  })
  @Post()
  async create(@Body() payload: Menu | Menu, @Res() res: any, @Req() req: any) {
    this.service.validate(payload);
    try {
      const record = await this.service.saveAndUpdate(
        payload,
        req.session.user,
      );
      return res
        .status(HttpStatus.CREATED)
        .send(sanitizeResponse(record, Menu.plural));
    } catch (e) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .send({ error: errorSanitizer(e) });
    }
  }
}
