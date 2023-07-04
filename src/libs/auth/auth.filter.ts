import { ArgumentsHost, Catch, ForbiddenException, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { ILoggerService } from '../logger/interface/logger-service.interface';

@Catch(ForbiddenException)
export class AuthForbiddenException extends HttpException {
  constructor(@Inject('ILoggerService') private readonly log: ILoggerService) {
    super('Forbidden', HttpStatus.FORBIDDEN);
  }

  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = (exception as HttpException)?.getStatus();

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });

    this.log.logger().error(`${this.log.loggerInfo(exception.message)}`);
    request['user'] = null;
  }
}
