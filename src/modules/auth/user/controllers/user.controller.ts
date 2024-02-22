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
} from '@app/rkpk';
import { UserService } from '../services/user.service';
import { existsSync, mkdirSync, unlinkSync } from 'fs';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller(`api/${User.plural}`)
export class UserController extends SharedController<User> {
  constructor(service: UserService) {
    super(service);
  }

  @Post('dps')
  @UseGuards(SessionGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: async (
          req: { session: { [x: string]: { id: any } } },
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
  getDp(@Param('dp') dp: string, @Res() res: any, @Query() query: any) {
    if (dp === 'default__rkpk_dp.png') {
      return res.sendFile(dp, {
        root: `./`,
      });
    }
    if (existsSync(`${ASSETS}/${query.id}/${dp}`)) {
      return res.sendFile(dp, {
        root: `${ASSETS}/${query.id}`,
      });
    }

    return res.sendFile('default__rkpk_dp.png', {
      root: `./`,
    });
  }
}
