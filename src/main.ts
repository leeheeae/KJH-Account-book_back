import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import * as express from 'express';
import * as fs from 'fs';
import { join } from 'path';
import { BACKEND_URL, PORT, fileFolder } from './common/constants/common.constant';
import { LoggerService } from './libs/logger/logger.service';
import { LoggerInterceptor } from './libs/logger/logger.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });

  const log = new LoggerService({ nodeEnv: process.env.NODE_ENV });

  if (process.env.NODE_ENV === 'development') {
    if (!fs.existsSync(fileFolder)) fs.mkdirSync(fileFolder);
  }

  if (process.env.SWAGGER_MODE === 'true') {
    const docs = require('../../swagger.json');
    docs.servers = [{ url: 'http://localhost:8000' }];
    SwaggerModule.setup('swagger', app, docs);
  }
  app.useGlobalInterceptors(new LoggerInterceptor(log));
  app.use('/files', express.static(join(__dirname, '../files')));
  const start = () => console.log(`Server Start! ${BACKEND_URL}`);
  await app.listen(PORT, start);
}
bootstrap();
