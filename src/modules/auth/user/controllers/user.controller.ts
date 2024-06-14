import {
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ASSETS,
  SessionGuard,
  SharedController,
  User,
  imageFileFilter,
  originalNames,
} from '@app/opensync';
import { UserService } from '../services/user.service';
import { existsSync, mkdirSync, unlinkSync } from 'fs';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ApiBody, ApiConsumes, ApiResponse } from '@nestjs/swagger';

@Controller(`api/${User.plural}`)
export class UserController extends SharedController<User> {
  constructor(service: UserService) {
    super(service);
  }

  @Post('dps')
  @ApiResponse({
    status: 201,
    description: 'Successful Response',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'User Not Found' })
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
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (
          req: any,
          _file: any,
          callback: (arg0: null, arg1: string) => void,
        ) => {
          if (!existsSync(`${ASSETS}/${req.session['user'].id}`)) {
            mkdirSync(`${ASSETS}/${req.session['user'].id}`);
            callback(null, `${ASSETS}/${req.session['user'].id}`);
          } else {
            callback(null, `${ASSETS}/${req.session['user'].id}`);
          }
        },
        filename: originalNames,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadedFile(@UploadedFile() file: any, @Req() req: any) {
    try {
      return await this.service.uploadDp(file, req.session['user']);
    } catch (e) {
      try {
        unlinkSync(`${ASSETS}/${req.user.id}/${file.filename}`);
      } catch (e) {}
      this.service.throwGenericError(e);
    }
  }

  @Get(':dp/dps')
  @ApiResponse({
    status: 201,
    description: 'Successful Response',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  getDp(@Param('dp') dp: string, @Res() res: any, @Query() query: any) {
    if (dp === 'default__opensync_dp.png') {
      return res.sendFile(dp, {
        root: `./`,
      });
    }
    if (existsSync(`${ASSETS}/${query.id}/${dp}`)) {
      return res.sendFile(dp, {
        root: `${ASSETS}/${query.id}`,
      });
    }

    return res.sendFile('default__opensync_dp.png', {
      root: `./`,
    });
  }
}
