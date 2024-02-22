import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('api/status')
  heartBeats() {
    return '✅';
  }

  @Get('/images/icons/gear.png')
  gear() {
    return '✅';
  }

  @Get('/favicon.ico')
  favicon() {
    return '✅';
  }
}
