import { FileInterface, SessionGuard, TEMPFILES } from '@app/opensync';
import {
  Controller,
  Get,
  HttpStatus,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
  UseGuards,
  Req,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { diskStorage } from 'multer';
import { AppService } from '../services/app.service';
import { ApiResponse, ApiConsumes, ApiBody } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly service: AppService) {}

  @Post('api/apps')
  @ApiResponse({
    status: 201,
    description: 'Successful Response',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Record Not Found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseGuards(SessionGuard)
  @UseInterceptors(
    FileInterceptor('app', {
      storage: diskStorage({
        destination: TEMPFILES,
        filename: (
          _req: any,
          _file: any,
          cb: (arg0: any, arg1: string) => void,
        ) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          cb(null, randomName + '.app.zip');
        },
      }),
    }),
  )
  async create(
    @Res() res: any,
    @Req() req: any,
    @UploadedFile() file: FileInterface,
  ): Promise<{ status: boolean; message?: string; error?: string }> {
    if (!file)
      return res.status(HttpStatus.BAD_REQUEST).send({ error: 'Missing app.' });
    try {
      const data = await this.service.create(file, req.session.user);
      this.service.deleteTemp(file.filename);
      return res
        .status(data.status ? HttpStatus.CREATED : HttpStatus.BAD_REQUEST)
        .send(data);
    } catch (error) {
      this.service.deleteTemp(file.filename);
      res.status(HttpStatus.BAD_REQUEST).send({ error: error.message });
    }
  }
  @Get('api/status')
  @ApiResponse({
    status: 200,
    description: 'Successful Response',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 404, description: 'Record Not Found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  heartBeats() {
    return '✅';
  }

  @Get('/images/icons/gear.png')
  @ApiResponse({
    status: 200,
    description: 'Successful Response',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 404, description: 'Record Not Found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  gear(@Res() res: Response) {
    return res?.sendFile('default__opensync_dp.png', {
      root: './',
    });
  }

  @Get('/favicon.ico')
  @ApiResponse({
    status: 200,
    description: 'Successful Response',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 404, description: 'Record Not Found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  ico(@Res() res: Response) {
    return res?.sendFile('default__opensync_dp.png', {
      root: './',
    });
  }
}
