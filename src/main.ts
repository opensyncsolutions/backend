import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ApiLogger, HttpErrorFilter, SYSTEM, schemaEntities } from '@app/rkpk';
import * as session from 'express-session';
import { createClient } from 'redis';
import * as passport from 'passport';
import 'reflect-metadata';
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
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
      secret: process.env.COOKIE_SECRET || 'RKPK@12!AFYA!!',
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());

  const config = new DocumentBuilder()
    .setTitle('RKPK')
    .setVersion('1.0')
    .build();

  const options: SwaggerDocumentOptions = {
    extraModels: schemaEntities,
    deepScanRoutes: true,
  };
  const Document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('api', app, Document);

  await app.listen(3000);
}
bootstrap();
