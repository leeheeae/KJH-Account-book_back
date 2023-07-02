import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import {
  DEV,
  ENV_FILE_NAME,
  ENV_FILE_NAME_DEV,
} from './common/constants/common.constant';
import * as Joi from 'joi';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:
        process.env.NODE_ENV === DEV ? ENV_FILE_NAME_DEV : ENV_FILE_NAME,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().required(),
        SWAGGER_USER: Joi.string().required(),
        SWAGGER_PASSWORD: Joi.string().required(),
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
