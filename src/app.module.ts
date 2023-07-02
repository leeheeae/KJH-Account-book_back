import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  DEV,
  ENV_FILE_NAME,
  ENV_FILE_NAME_DEV,
  PROD,
} from './common/constants/common.constant';
import * as Joi from 'joi';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { MulterModule } from '@nestjs/platform-express';
import { HealthModule } from './health/health.module';
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
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.string().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_DATABASE: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      synchronize: process.env.NODE_ENV !== PROD,
      keepConnectionAlive: false,
      namingStrategy: new SnakeNamingStrategy(),
      entities: [],
    }),
    MulterModule.register({
      dest: './files',
    }),
    HealthModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: 'IAppService',
      useClass: AppService,
    },
  ],
})
export class AppModule {}
