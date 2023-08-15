import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import * as express from 'express';
import { join } from 'path';
import { BACKEND_URL, PORT } from './common/constants/global.constant';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });
  if (process.env.SWAGGER_MODE === 'true') {
    const docs = require('../../swagger.json');
    docs.servers = [{ url: 'http://localhost:8000' }];
    SwaggerModule.setup('swagger', app, docs);
  }
  app.use('/files', express.static(join(__dirname, '../files')));
  const start = () => console.log(`Server Start! ${BACKEND_URL}`);
  await app.listen(PORT, start);
}
bootstrap();
