import {
  Menu,
  SessionGuard,
  SharedController,
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
import { ApiResponse } from '@nestjs/swagger';

@Controller(`api/${Menu.plural}`)
export class MenuController extends SharedController<Menu> {
  constructor(readonly service: MenuService) {
    super(service);
  }

  @UseGuards(SessionGuard)
  @ApiResponse({
    status: 201,
    description: 'Successful Response',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Record Not Found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
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
