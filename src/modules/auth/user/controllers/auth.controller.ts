import {
  AuthGuard,
  BadRequestError,
  InternalServerError,
  Login,
  NotFoundError,
  SessionGuard,
  UnauthorizedError,
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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from '../services/user.service';

@ApiTags('Auth')
@Controller('api')
export class AuthController {
  constructor(private service: UserService) {}

  @UseGuards(AuthGuard)
  @Post('login')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful Response' })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad Request',
    schema: {
      example: {
        error: 'Invalid Username or Password.',
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
    type: UnauthorizedError,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
    type: InternalServerError,
  })
  @ApiOperation({
    summary: 'User Login',
    description:
      'This endpoint allows user to login to the system. The user is authenticated and a session is created.',
  })
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
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful Response' })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad Request',
    schema: { example: { error: 'Invalid fields supplied' } },
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
  @ApiOperation({
    summary: 'Get Logged In User Details',
    description:
      'This endpoint allows you get the details of the currently logged in user.',
  })
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
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful Response' })
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
  @ApiOperation({
    summary: 'User Logout',
    description:
      'This endpoint allows user to logout of the system. The session is destroyed.',
  })
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
