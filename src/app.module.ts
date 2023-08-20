import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DEV, ENV_FILE_NAME, ENV_FILE_NAME_DEV, PROD } from './common/constants/common.constant';
import * as Joi from 'joi';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { MulterModule } from '@nestjs/platform-express';
import { HealthModule } from './health/health.module';
import { UsersModule } from './users/users.module';
import { JwtMiddleware } from './libs/jwt/jwt.middleware';
import { JwtModule } from './libs/jwt/jwt.module';
import { LoggerModule } from './libs/logger/logger.module';
import { User } from './users/entities/user.entity';
import { I_APP_SERVICE } from './common/constants/service/service.constant';
import { PetsModule } from './pets/pets.module';
import { TrailsModule } from './trails/trails.module';
import { CoursesModule } from './courses/courses.module';
import { ReportsModule } from './reports/reports.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === DEV ? ENV_FILE_NAME_DEV : ENV_FILE_NAME,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().required(),
        SWAGGER_USER: Joi.string().required(),
        SWAGGER_PASSWORD: Joi.string().required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.string().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_DATABASE: Joi.string().required(),
        JWT_PRIVATE_KEY: Joi.string().required(),
        JWT_EXPIRES_SEC: Joi.string().required(),
        REFRESH_EXPIRES_SEC: Joi.string().required(),
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
      entities: [User],
    }),
    JwtModule.forRoot({
      jwtPrivateKey: process.env.JWT_PRIVATE_KEY,
      jwtExpiresSec: process.env.JWT_EXPIRES_SEC,
      refreshExpiresSec: process.env.REFRESH_EXPIRES_SEC,
    }),
    LoggerModule.forRoot({
      nodeEnv: process.env.NODE_ENV,
    }),
    MulterModule.register({
      dest: './files',
    }),
    HealthModule,
    UsersModule,
    PetsModule,
    TrailsModule,
    CoursesModule,
    ReportsModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: I_APP_SERVICE,
      useClass: AppService,
    },
  ],
  exports: [I_APP_SERVICE],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware).forRoutes({
      path: '/users/*',
      method: RequestMethod.ALL,
    });
  }
}
