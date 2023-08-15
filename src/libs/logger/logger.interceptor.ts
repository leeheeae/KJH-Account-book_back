import { CallHandler, NestInterceptor, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoggerService } from './logger.service';
import * as chalk from 'chalk';
import * as _ from 'lodash';
export interface IResponse<T> {
  data: T;
}

export class LoggerInterceptor<T> implements NestInterceptor<T, IResponse<T>> {
  constructor(private readonly log: LoggerService) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<IResponse<T>> {
    const methodName = context.getHandler().name;
    const httpMethodName = context.switchToHttp().getRequest().method;
    return next.handle().pipe(
      map((response) => {
        if (!response.includes('{') && !response.includes('}')) return response;

        const data = JSON.parse(response);
        if (_.isEmpty(data?.message?.text)) return data;

        const { text, statusCode } = data.message;

        if (_.isEqual(typeof data, 'object') && _.has(data, 'success') && _.has(data, 'message')) {
          if (data.success) {
            const colorHttpMethod = chalk.yellow(`${httpMethodName}`);
            const colorStatusCode = chalk.green(`${statusCode}`);
            const colorName = chalk.cyan(`[Method Name] : `);
            const colorMethod = chalk.yellow(`${methodName}()`);
            const colorStatus = chalk.cyan(` , [Status Code] : ${colorStatusCode}`);
            const colorText = chalk.green(`${text}`);

            // * 콘솔에 찍힐때는 컬러 포함
            this.log.logger().info(`${colorHttpMethod} | ${colorName}${colorMethod}${colorStatus} | [Success Message] ::: ${colorText}`);
          } else {
            const colorHttpMethodName = chalk.red(`${httpMethodName}`);
            const colorStatusCode = chalk.red(`${statusCode}`);
            const colorMethodInfo = chalk.yellow(`[Method Name] : ${methodName}() , [Status Code] : ${colorStatusCode}`);
            const colorMessage = chalk.red(`${text}`);

            // ! client error
            context.switchToHttp().getResponse().statusCode = data.message.statusCode;
            // * 콘솔에 찍힐때는 컬러 포함
            this.log.logger().error(`${colorHttpMethodName} | ${colorMethodInfo} | [Message] ::: ${colorMessage} | [Text] ::: ${text}`);
          }
        }
        return data;
      }),
    );
  }
}
