import {
  CanActivate,
  ExecutionContext,
  Logger,
  NotAcceptableException,
} from '@nestjs/common';
import { User } from '../entities/auth/user.entity';
import { SESSIONTIME } from '../system';

export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest();
    try {
      if (request.body.username === '' || request.body.password === '') {
        Logger.error(
          (request.body.username === ''
            ? ' username'
            : 'password'
          ).toUpperCase() + ' CAN NOT BE EMPTY',
          'ERROR',
        );

        throw new NotAcceptableException(
          `You provided an empty ${
            request.body.username === '' ? ' username' : 'password'
          }`,
        );
      }
      if (!request.body.username || !request.body.password) {
        Logger.error(
          `MISSING [${
            !request?.body?.username
              ? 'USERNAME'
              : !request?.body?.password
                ? 'PASSWORD'
                : 'CREDENTIALS'
          }]`,
          'ERROR',
        );
        return false;
      }
      const user = await User.authenticateUser(
        request.body.username,
        request.body.password,
      );
      Logger.debug(`ATTEMPTED LOGIN [${request?.body?.username}]`, 'INFO');
      delete user?.password;
      delete user?.salt;
      return this.createSession(user, request);
    } catch (e) {
      throw new NotAcceptableException(e.message);
    }
  }

  private setLastLogin = async (user: User) => {
    await User.save({ id: user.id, lastLogin: new Date() });
    return;
  };

  private validateUser = (user: User, request: any) => {
    if (!user) {
      Logger.debug(`LOGIN FAILED [${request.body.username}]`, 'INFO');
      throw new NotAcceptableException(`Invalid Username or Password`);
    }

    this.setLastLogin(user);
  };

  private createSession = (user: User, request: any): boolean => {
    this.validateUser(user, request);
    if (!request.session) {
      request.session = {};
      request.session.cookie = {};
    }
    delete user.password;
    delete user.salt;
    request.session.user = user;
    const sessionTime = SESSIONTIME;
    request.session.cookie.expires = new Date(Date.now() + sessionTime);

    Logger.debug(
      `LOGIN SUCCESS NAME: [${user.name}] USERNAME: [${user.phoneNumber}]`,
      'INFO',
    );
    return true;
  };
}
