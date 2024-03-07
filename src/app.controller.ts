import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller()
export class AppController {
  @Get('api/status')
  heartBeats() {
    return '✅';
  }

  @Get('/images/icons/gear.png')
  gear(@Res() res: Response) {
    return res?.sendFile('default__opensync_dp.png', {
      root: `./`,
    });
  }

  @Get('/favicon.ico')
  ico(@Res() res: Response) {
    return res?.sendFile('default__opensync_dp.png', {
      root: `./`,
    });
  }
}
