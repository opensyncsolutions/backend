import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { errorSanitizer } from '../helpers/index';

@Catch()
export class HttpErrorFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const request = context.getRequest();
    const response = context.getResponse();
    if (
      (exception?.response?.message?.includes('Cannot GET') ||
        exception?.response?.message?.includes('Cannot POST') ||
        exception?.response?.message?.includes('Cannot PUT') ||
        exception?.response?.message?.includes('Cannot PATCH')) &&
      !exception?.response?.message?.includes('/api/')
    ) {
      const errorArray: string[] = exception?.response?.message?.split(' ');

      if (!errorArray[errorArray?.length - 1]?.includes('/api')) {
        Logger.warn(`MISSING ROUTE: ${request?.url}`, 'WARN');
        return response.redirect('/');
      }

      Logger.warn(`MISSING ROUTE: ${request?.url}`, 'WARN');
      return response.redirect('/');
    }
    try {
      let message: string;
      const detail = exception.detail;
      if (
        detail &&
        typeof detail === 'string' &&
        (detail?.includes('already exists') ||
          detail?.includes('is still referenced from table') ||
          detail.includes('is not present'))
      ) {
        message = exception?.table?.split('_').join(' ') + ' with';
        message = exception?.detail?.replace('Key', message);
        if (detail?.includes('is not present')) {
          message = `${detail.split('(')[1]} could not be found`;
        }
      } else {
        message = exception?.message?.includes('Bad Request Exception')
          ? exception?.response?.message?.join(',')
          : exception?.message || exception?.error;
      }
      message = message?.split('(').join('');
      message = message?.split(')').join('');
      message = message?.split('=').join(' ');
      if (!request?.url?.includes('.'))
        Logger.error(
          `${request?.method} ${request?.url}`,
          exception?.stack,
          'Exception',
        );
      const error = errorSanitizer({
        message,
        detail: message,
        response: exception,
        url: request?.url,
        method: request?.method,
      });
      return response
        .status(
          error?.includes('not found') ||
            error?.includes('not be found') ||
            error?.toUpperCase()?.includes('ENOENT')
            ? HttpStatus.NOT_FOUND
            : error?.includes('authorized')
              ? HttpStatus.UNAUTHORIZED
              : error?.includes('permission')
                ? HttpStatus.FORBIDDEN
                : this.getStatus(exception),
        )
        .send({
          error,
        });
    } catch (e) {
      Logger.error(e.message);
      return response
        .status(HttpStatus.NOT_FOUND)
        .send({ error: 'Internal Server Error' });
    }
  }

  getStatus = (exception: any): number => {
    try {
      return exception.getStatus();
    } catch (e) {
      return HttpStatus.BAD_REQUEST;
    }
  };
}
