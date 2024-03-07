import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import {
  APPENV,
  ApiLogger,
  HttpErrorFilter,
  PORT,
  SYSTEM,
  schemaEntities,
} from '@app/opensync';
import * as session from 'express-session';
import { createClient } from 'redis';
import * as passport from 'passport';
import 'reflect-metadata';
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const RedisStore = require('connect-redis').default;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });
  SYSTEM();
  app.disable('x-powered-by');
  app.useGlobalInterceptors(new ApiLogger());
  app.useGlobalFilters(new HttpErrorFilter());
  app.useGlobalPipes(
    new ValidationPipe({ transform: true, forbidUnknownValues: false }),
  );
  const host: string = process.env.REDIS_HOST || 'redis';
  const port: number = Number(process.env.REDIS_PORT) || 6379;
  const redisClient = createClient({
    name: host,
    url: `redis://${host}:${port}`,
  });
  redisClient.connect().catch(console.error);

  app.use(
    session({
      store: new RedisStore({
        client: redisClient,
      }),
      resave: false,
      saveUninitialized: false,
      secret: APPENV.COOKIE_SECRET,
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());

  if (APPENV.NODE_ENV === 'development') {
    const config = new DocumentBuilder()
      .setTitle('opensync')
      .setVersion('1.0')
      .build();

    const options: SwaggerDocumentOptions = {
      extraModels: schemaEntities,
      deepScanRoutes: true,
    };
    const Document = SwaggerModule.createDocument(app, config, options);
    SwaggerModule.setup('api', app, Document);
  }
  await app.listen(PORT);
  Logger.debug(`App running on port: ${PORT}`, 'APP PORT');
}
bootstrap();
