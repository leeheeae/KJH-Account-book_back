import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import * as express from 'express';
import * as fs from 'fs';
import * as expressBasicAuth from 'express-basic-auth';
import { DEV } from './common/constants/common.constant';
import { ValidationPipe } from '@nestjs/common';
import { setupSwagger } from './common/utils/setup-swagger';
import { LoggerService } from './libs/logger/logger.service';
import { LoggerInterceptor } from './libs/logger/logger.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });

  const fileFolder = join(process.cwd(), `./files`);

  if (process.env.NODE_ENV === DEV) {
    if (!fs.existsSync(fileFolder)) fs.mkdirSync(fileFolder);
  }

  const PORT = process.env.NODE_ENV === DEV ? 8000 : 3000;
  const log = new LoggerService({ nodeEnv: process.env.NODE_ENV });

  app.use(
    '/api-docs',
    expressBasicAuth({
      challenge: true,
      users: {
        [process.env.SWAGGER_USER]: process.env.SWAGGER_PASSWORD,
      },
    }),
  );
  setupSwagger(app);
  app.use('/files', express.static(join(__dirname, '../files')));

  app.useGlobalInterceptors(new LoggerInterceptor(log));
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  await app.listen(PORT);

  console.log(`Application is running on: 🎁 http://localhost:${PORT}`);
}
bootstrap();
