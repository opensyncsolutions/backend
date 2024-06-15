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
  splitByCapital,
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
      .addGlobalParameters({
        name: 'page',
        in: 'query',
        description:
          'This specifies the page number to be returned in the response',
        schema: { type: 'integer' },
      })
      .addGlobalParameters({
        name: 'pageSize',
        in: 'query',
        description:
          'This specifies the number of records to be returned in the response',
        schema: { type: 'integer' },
      })
      .addGlobalParameters({
        name: 'fields',
        in: 'query',
        description:
          'This specifies the fields to be returned in the response. You can also include relationships in this query',
        schema: { type: 'string' },
      })
      .addGlobalParameters({
        name: 'filter',
        in: 'query',
        example: 'name:eq:John',
        description:
          'This query is used to filter the response. You can add searches and filters in this query',
        schema: { type: 'array' },
      })
      .setTitle('OpenSYNC')
      .setVersion('1.0')
      .build();

    const options: SwaggerDocumentOptions = {
      extraModels: schemaEntities,
      deepScanRoutes: true,
    };
    const document = SwaggerModule.createDocument(app, config, options);
    for (const path in document.paths) {
      for (const method in document.paths[path]) {
        document.paths[path][method].operationId = splitByCapital(
          (document.paths[path][method].operationId ?? '').split('_')[1],
        );
      }
    }

    SwaggerModule.setup('api', app, document);
  }
  await app.listen(PORT);
  Logger.debug(`App running on port: ${PORT}`, 'APP PORT');
}
bootstrap();
