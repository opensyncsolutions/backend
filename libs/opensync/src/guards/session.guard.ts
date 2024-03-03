import {
  CanActivate,
  createParamDecorator,
  ExecutionContext,
  Injectable,
  Logger,
  NotAcceptableException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from '..';
@Injectable()
export class SessionGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest();

    try {
      if (request.session && request.session.user) {
        request.session.previousPath = request.path;
        return true;
      }
      if (request.headers?.authorization) {
        const buff = Buffer.from(
          request.headers?.authorization.replace('Basic ', ''),
          'base64',
        );
        const auth = buff.toString('ascii')?.split(':');
        const user = await User.verifyUser(auth[0], auth[1]);
        delete user.password;
        delete user.salt;
        this.verifyUser(user);

        if (!request.session) {
          request.session = {};
        }
        request.session.user = user;
        delete request?.body?.created;
        delete request?.body?.updated;
        return true;
      }

      Logger.debug(
        `SESSION EXPIRED ${
          request?.body?.username ? `[${request?.body?.username}]` : ''
        }`,
        'INFO',
      );
      throw new UnauthorizedException();
    } catch (e) {
      Logger.error(
        `${e?.message?.toUpperCase()} ${request?.body?.username ?? ''}`,
        'INFO',
      );
      throw new UnauthorizedException(e?.message);
    }
  }

  verifyUser = (user: User) => {
    Logger.debug(`LOGIN SUCCESSFUL [${user?.name}]`, 'INFO');
    if (!user?.active) {
      Logger.debug(`LOGIN NOT PERMITTED [${user?.name}]`, 'INFO');
      throw new NotAcceptableException('You are not permitted to login');
    }
    return;
  };
}
export const SessionUser = createParamDecorator((data, req) => {
  return req.session.user;
});

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    return request.isAuthenticated();
  }
}
