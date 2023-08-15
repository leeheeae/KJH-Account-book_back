import { DynamicModule, Global, Module } from '@nestjs/common';
import { CONFIG_OPTIONS } from 'src/common/constants/common.constant';
import { LoggerService } from './logger.service';
import { ILoggerModuleOptions } from './interface/logger.interface';

@Global()
@Module({})
export class LoggerModule {
  static forRoot(options: ILoggerModuleOptions): DynamicModule {
    return {
      module: LoggerModule,
      providers: [
        {
          provide: CONFIG_OPTIONS,
          useValue: options,
        },
        {
          provide: 'ILoggerService',
          useClass: LoggerService,
        },
      ],
      exports: ['ILoggerService'],
    };
  }
}
