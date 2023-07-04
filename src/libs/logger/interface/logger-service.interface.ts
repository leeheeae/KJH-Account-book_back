import * as winston from 'winston';

export interface ILoggerService {
  logger(): winston.Logger;
  loggerInfo(custom?: string | null, message?: string | null, name?: string | null, stack?: string | null): string;
}
