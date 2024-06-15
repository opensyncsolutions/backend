import {
  Controller,
  Get,
  HttpStatus,
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
  BadRequestError,
  InternalServerError,
  NotFoundError,
  SessionGuard,
  SharedController,
  UnauthorizedError,
  User,
  imageFileFilter,
  originalNames,
} from '@app/opensync';
import { UserService } from '../services/user.service';
import { existsSync, mkdirSync, unlinkSync } from 'fs';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
@ApiTags('Users')
@Controller(`api/${User.plural}`)
export class UserController extends SharedController<User> {
  constructor(service: UserService) {
    super(service);
  }

  @Post('dps')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Successful Response',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad Request',
    type: BadRequestError,
    schema: {
      example: { statusCode: 400, message: 'Only images are allowed' },
    },
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Not Found',
    type: NotFoundError,
    schema: {
      example: { statusCode: 400, message: 'Only images are allower' },
    },
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
    type: UnauthorizedError,
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User Not Found' })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
    type: InternalServerError,
  })
  @ApiConsumes('multipart/form-data')
  @ApiOperation({
    summary: 'Upload User profile picture',
    description:
      'This endpoint allows user to upload their profile picture. The file is processed and stored accordingly.',
  })
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
  async uploadDp(@UploadedFile() file: any, @Req() req: any) {
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
    status: HttpStatus.CREATED,
    description: 'Successful Response',
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
