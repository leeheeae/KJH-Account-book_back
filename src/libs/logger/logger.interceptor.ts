import { CallHandler, NestInterceptor, ExecutionContext, HttpStatus } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoggerService } from './logger.service';
import * as chalk from 'chalk';
import * as _ from 'lodash';
export interface Response<T> {
  data: T;
}

export class LoggerInterceptor<T> implements NestInterceptor<T, Response<T>> {
  constructor(private readonly log: LoggerService) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    const methodName = context.getHandler().name;
    const httpMethodName = context.switchToHttp().getRequest().method;
    return next.handle().pipe(
      map(data => {
        if (_.isEmpty(data?.message?.text)) return data;

        const { text, statusCode } = data.message;

        if (_.isEqual(typeof data, 'object') && _.has(data, 'ok') && _.has(data, 'message')) {
          if (data.ok) {
            data.error = null;
            const colorHttpMethod = chalk.yellow(`${httpMethodName}`);
            const colorStatusCode = chalk.green(`${statusCode}`);
            const colorName = chalk.cyan(`[Method Name] : `);
            const colorMethod = chalk.yellow(`${methodName}()`);
            const colorStatus = chalk.cyan(` , [Status Code] : ${colorStatusCode}`);
            const colorText = chalk.green(`${text}`);

            // * 콘솔에 찍힐때는 컬러 포함
            this.log
              .logger()
              .info(
                `${colorHttpMethod} | ${colorName}${colorMethod}${colorStatus} | [Success Message] ::: ${colorText}`,
              );
          } else {
            const { message, stack, name } = data.error;
            const colorHttpMethodName = chalk.red(`${httpMethodName}`);
            const colorStatusCode = chalk.red(`${statusCode}`);
            const colorMethodInfo = chalk.yellow(
              `[Method Name] : ${methodName}() , [Status Code] : ${colorStatusCode}`,
            );
            const colorMessage = chalk.red(`${message}`);
            const colorStack = chalk.red(`${stack}`);

            if (message.includes('Error:')) {
              // ! server error & query error
              context.switchToHttp().getResponse().statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
              // * 콘솔에 찍힐때는 컬러 포함
              this.log
                .logger()
                .error(
                  `${colorHttpMethodName} | ${colorMethodInfo} | [Name] ::: ${name} | [Message] ::: ${colorMessage}`,
                );

              data.error = `[Name] ::: ${name} | [로그 메시지 참고]`;
            } else {
              // ! client error
              context.switchToHttp().getResponse().statusCode = data.message.statusCode;
              // * 콘솔에 찍힐때는 컬러 포함
              this.log
                .logger()
                .error(
                  `${colorHttpMethodName} | ${colorMethodInfo} | [Message] ::: ${colorMessage} | [Name] ::: ${name} | [Stack] ::: ${colorStack}`,
                );

              data.error = message;
            }
          }
        }
        return data;
      }),
    );
  }
}
