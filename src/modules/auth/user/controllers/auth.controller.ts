import {
  AuthGuard,
  Login,
  SessionGuard,
  User,
  sanitizeResponse,
} from '@app/opensync';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Logger,
  Post,
  Query,
  Req,
  Res,
  Session,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { UserService } from '../services/user.service';

@Controller('api')
export class AuthController {
  constructor(private service: UserService) {}

  @UseGuards(AuthGuard)
  @Post('login')
  @ApiResponse({
    status: 200,
    description: 'Successful Response',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async login(
    @Res() res: any,
    @Session() session: any,
    @Query() query: any,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Body() _login: Login,
  ): Promise<User> {
    try {
      return res.status(HttpStatus.OK).send(
        sanitizeResponse(
          await this.service.findOneOrFailInternal({
            id: session.user.id,
            fields: query.fields,
            filter: query.filters,
            rootJoin: query.rootJoin,
            include: query.include,
            user: session.user,
          }),
          this.service.Entity['plural'],
        ),
      );
    } catch (e) {
      Logger.debug(e.message, 'LOGIN ERROR');
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .send({ message: 'Username or Password provided is incorrect.' });
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
  @Get('me')
  async me(
    @Res() res: any,
    @Query() query: any,
    @Session() session: any,
  ): Promise<User> {
    return res.status(HttpStatus.OK).send(
      sanitizeResponse(
        await this.service.findOneOrFailInternal({
          id: session?.user?.id,
          fields: query.fields,
          filter: query.filters,
          rootJoin: query.rootJoin,
          userGroup: query.userGroup,
          user: session.user,
        }),
        this.service.Entity['plural'],
      ),
    );
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
  @Get('logout')
  async logout(
    @Req() request: any,
    @Res() res: any,
  ): Promise<{ message: string }> {
    request.session.destroy();
    return res
      .status(HttpStatus.OK)
      .send({ message: 'User logged out successfully' });
  }
}
