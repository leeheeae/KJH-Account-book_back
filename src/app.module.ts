import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { DEV, DEV_PORT, PROD, PROD_PORT } from './common/constants/common.constant';
import * as Joi from 'joi';
import { JwtMiddleware } from './libs/jwt/jwt.middleware';
import { JwtModule } from './libs/jwt/jwt.module';
import { LoggerModule } from './libs/logger/logger.module';

@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === DEV ? '.env.development' : '.env',
      ignoreEnvFile: process.env.NODE_ENV === PROD,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid(DEV, PROD).required(),
        PORT: Joi.string().valid(PROD_PORT, DEV_PORT).required(),
        BACKEND_URL: Joi.string().required(),
        FRONTEND_URL: Joi.string().required(),
        PRIVATE_KEY: Joi.string().required(),
        SALT_ROUNDS: Joi.string().required(),
        SWAGGER_MODE: Joi.string().valid('true', 'false').required(),
        JWT_PRIVATE_KEY: Joi.string().required(),
        JWT_EXPIRES_SEC: Joi.string().required(),
        REFRESH_EXPIRES_SEC: Joi.string().required(),
      }),
    }),
    JwtModule.forRoot({
      jwtPrivateKey: process.env.JWT_PRIVATE_KEY,
      jwtExpiresSec: process.env.JWT_EXPIRES_SEC,
      refreshExpiresSec: process.env.REFRESH_EXPIRES_SEC,
    }),
    LoggerModule.forRoot({
      nodeEnv: process.env.NODE_ENV,
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware)
      .exclude(
        { path: '/users/login', method: RequestMethod.POST },
        { path: '/users/register', method: RequestMethod.POST },
      )
      .forRoutes({
        path: '/users/*',
        method: RequestMethod.ALL,
      });
  }
}
