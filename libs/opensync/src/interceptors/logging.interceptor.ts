import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class ApiLogger implements NestInterceptor {
  intercept(context: ExecutionContext, call$: CallHandler): Observable<any> {
    try {
      const requestObject = context.switchToHttp().getResponse();
      const request = '' + requestObject ? requestObject?.req || {} : {};
      return call$.handle().pipe(
        tap(async () => {
          if (!this.ignoreRoutes(request.url))
            Logger.log(
              `${request.method} ${request.url}`,
              request?.session?.user?.name ?? 'SYSTEM',
            );
        }),
      );
    } catch (e) {
      Logger.log(e.message, 'ERRORs');
    }
  }

  ignoreRoutes = (url: string) =>
    url?.includes('.js') ||
    url?.includes('.css') ||
    url?.includes('.html') ||
    url?.includes('.png') ||
    url === '/api/status';
}
