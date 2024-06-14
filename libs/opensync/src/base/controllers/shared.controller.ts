import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { existsSync, mkdirSync, unlinkSync } from 'fs';
import { diskStorage } from 'multer';
import { BaseEntity, EntityTarget } from 'typeorm';
import { deleteFile, getId } from '../../helpers';
import {
  csvAndXsxlOnly,
  editFileName,
  originalNames,
} from '../../helpers/file.interceptor.helper';
import { pagerDetails } from '../../helpers/pager.helper';
import {
  errorSanitizer,
  sanitizeResponse,
} from '../../helpers/sanitizer.helpert';
import {
  DeleteResInterface,
  PagerInterface,
} from '../../interfaces/shared.interface';
import { ASSETS, TEMPFILES } from '../../system';
import { SharedService } from '../services/shared.service';
import { SessionGuard } from '../..';
import { ApiResponse } from '@nestjs/swagger';

@Controller()
export class SharedController<T extends BaseEntity> {
  private entity: EntityTarget<T>;
  /**
   *
   * @param service
   * @param entity
   */
  constructor(public readonly service: SharedService<T>) {
    this.entity = service.Entity;
  }
  @UseGuards(SessionGuard)
  @Post()
  @ApiResponse({
    status: 201,
    description: 'Successful Response',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async create(
    @Body() payload: T,
    @Res() res: any,
    @Req() req: any,
    @Query() query: any,
  ) {
    this.service.validate(payload);
    try {
      const record = await this.service.save({
        ...payload,
        user: req.session.user,
        query,
      });
      return res
        .status(HttpStatus.CREATED)
        .send(sanitizeResponse(record, this.entity['plural']));
    } catch (e) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .send({ error: errorSanitizer(e) });
    }
  }

  @UseGuards(SessionGuard)
  @Get()
  @ApiResponse({
    status: 200,
    description: 'Successful Response',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async getMany(
    @Res() res: any,
    @Query() query: any,
    @Req() req: any,
  ): Promise<BaseEntity> {
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
      [this.entity['plural']]: sanitizeResponse(
        record[this.entity['plural']],
        this.entity['plural'],
        query.fields,
        true,
      ),
    });
  }
  @UseGuards(SessionGuard)
  @Get('downloads')
  async download(
    @Res() res: any,
    @Query() query: any,
    @Req() req: any,
  ): Promise<T> {
    const pager: PagerInterface = pagerDetails({
      page: query.page,
      pageSize: query.pageSize,
    });
    const name = `${this.service.Entity['plural']}_${getId(10)}.${
      query.type || 'xlsx'
    }`;
    await this.service.download({
      ...pager,
      fields: query.fields,
      filter: query.filter,
      order: query.order,
      rootJoin: query.rootJoin,
      user: req.session.user,
      include: query.include,
      userGroup: query.userGroup,
      name,
    });
    res.setHeader(
      'Content-disposition',
      `attachment; filename=${this.service.Entity['plural']?.toLowerCase()}.${
        query.type || 'xlsx'
      }`,
    );
    if (existsSync(`${TEMPFILES}/${name}`))
      return res.sendFile(name, { root: TEMPFILES });
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
      error: 'An error occurred while trying to export. Please try again',
    });
  }
  @UseGuards(SessionGuard)
  @Get('fields')
  @ApiResponse({
    status: 200,
    description: 'Successful Response',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async getFields(@Res() res: any, @Req() req: any): Promise<any[]> {
    return res
      .status(HttpStatus.OK)
      .send(
        sanitizeResponse(
          this.service.fields(req.session.user),
          this.entity['plural'],
          '*',
          false,
        ),
      );
  }

  @Post('bulky')
  @UseGuards(SessionGuard)
  async updateBulky(@Body() payload: T[], @Res() res: any, @Req() req: any) {
    try {
      const record = await this.service.bulky({
        payload,
        user: req.session.user,
      });
      return res
        .status(HttpStatus.CREATED)
        .send(sanitizeResponse(record, this.entity['plural']));
    } catch (e) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .send({ error: errorSanitizer(e) });
    }
  }

  @UseGuards(SessionGuard)
  @ApiResponse({
    status: 200,
    description: 'Successful Response',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Record Not Found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Get(':id')
  async getOne(
    @Res() res: any,
    @Param('id') id: string,
    @Req() req: any,
    @Query() query: any,
  ): Promise<T> {
    const record = await this.service.findOneOrFail({
      id,
      user: req.session.user,
      fields: query.fields,
      filter: query.filter,
      rootJoin: query.rootJoin,
      include: query.include,
      userGroup: query.userGroup,
    });

    return res
      .status(HttpStatus.OK)
      .send(
        sanitizeResponse(record, this.entity['plural'], query.fields, true),
      );
  }

  @UseGuards(SessionGuard)
  @Put(':id')
  @ApiResponse({
    status: 200,
    description: 'Successful Response',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Record Not Found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async updateOne(
    @Res() res: any,
    @Req() req: any,
    @Query() query: any,
    @Param('id') id: string,
    @Body() payload: T,
  ): Promise<T> {
    this.service.validate(payload);
    const existingRecord = await this.service.findOneOrFailInternal({ id });
    delete existingRecord['password'];
    const updatedRecord = await this.service.save({
      ...payload,
      update: true,
      id,
      user: req.session.user,
      query,
    });
    deleteFile(`${TEMPFILES}/${id}.pdf`);
    return res
      .status(HttpStatus.OK)
      .send(
        sanitizeResponse(
          updatedRecord,
          this.entity['plural'],
          query.fields,
          true,
        ),
      );
  }

  @UseGuards(SessionGuard)
  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'Successful Response',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Record Not Found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async deleteOne(
    @Res() res: any,
    @Param('id') id: string,
    @Req() req: any,
  ): Promise<DeleteResInterface> {
    const deletedRecord = await this.service.delete(id, req.session.user);
    return res
      .status(HttpStatus.OK)
      .send(sanitizeResponse(deletedRecord, this.entity['plural']));
  }

  @Post(':id/assets')
  @ApiResponse({
    status: 201,
    description: 'Successful Response',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @UseGuards(SessionGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: async (req, _file, callback) => {
          if (!existsSync(`${ASSETS}/${req.params.id}`)) {
            mkdirSync(`${ASSETS}/${req.params.id}`);
            callback(null, `${ASSETS}/${req.params.id}`);
          } else {
            callback(null, `${ASSETS}/${req.params.id}`);
          }
        },
        filename: originalNames,
      }),
    }),
  )
  async uploadedFile(
    @UploadedFile() file: any,
    @Req() req: any,
    @Param('id') id: string,
  ) {
    try {
      return await this.service.asset(file, req.session['user'], id);
    } catch (e) {
      try {
        unlinkSync(`${ASSETS}/${req.params.id}/${file.filename}`);
      } catch (e) {}
      this.service.throwGenericError(e);
    }
  }

  @Get(':asset/assets')
  @ApiResponse({
    status: 200,
    description: 'Successful Response',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Asset Not Found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  getAsset(
    @Param('asset') asset: string,
    @Res() res: Response,
    @Query() query: any,
  ) {
    if (existsSync(`${ASSETS}/${query.id}/${asset}`)) {
      return res.sendFile(asset, {
        root: `${ASSETS}/${query.id}`,
        headers: { filename: asset, fileName: asset },
      });
    }

    return res
      .status(HttpStatus.NOT_FOUND)
      .send({ error: 'Asset could not be found' });
  }
  @Post('imports')
  @ApiResponse({
    status: 201,
    description: 'Successful Response',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @UseGuards(SessionGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: async (_req, _file, callback) => {
          if (!existsSync(TEMPFILES)) {
            mkdirSync(TEMPFILES);
            callback(null, TEMPFILES);
          } else {
            callback(null, TEMPFILES);
          }
        },
        filename: editFileName,
      }),
      fileFilter: csvAndXsxlOnly,
    }),
  )
  async import(
    @UploadedFile() file: any,
    @Req() req: any,
    @Res() res: Response,
    @Query() query: any,
  ) {
    if (!file)
      return res
        .status(HttpStatus.BAD_REQUEST)
        .send({ error: 'No file was sent' });
    try {
      const record = await this.service.import({
        user: req.session.user,
        file,
        filters: query.filter,
        query,
      });
      return res
        .status(HttpStatus.CREATED)
        .send(sanitizeResponse(record, this.service.Entity['plural']));
    } catch (e) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .send({ error: errorSanitizer(e) });
    }
  }
}
