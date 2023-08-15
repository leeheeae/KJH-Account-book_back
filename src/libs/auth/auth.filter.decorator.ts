import { ArgumentsHost, HttpException, HttpStatus, Catch } from '@nestjs/common';
import { LoggerService } from '../logger/logger.service';

@Catch()
export class ForbiddenException extends HttpException {
  constructor(private readonly log: LoggerService) {
    super('Forbidden', HttpStatus.FORBIDDEN);
  }

  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = (exception as HttpException).getStatus();

    if (status === HttpStatus.FORBIDDEN) {
      response.status(status).json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
      });

      this.log.logger().error(`${this.log.loggerInfo(exception.message)}`);
    }
  }
}
