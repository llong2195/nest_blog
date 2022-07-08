import {
  Catch,
  ExceptionFilter,
  HttpException,
  ArgumentsHost,
  Logger,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpErrorFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();
    const statusCode = exception.getStatus();
    const messageException = exception.getResponse();

    const errorResponse = {
      statusCode: statusCode,
      timestamp: new Date().toLocaleTimeString(),
      path: request.url,
      method: request.method,
      message:
        typeof messageException == 'string'
          ? messageException
          : JSON.parse(JSON.stringify(messageException)).message,
    };
    Logger.error(`${request.url}`, JSON.stringify(errorResponse), 'Exception');
    response.status(statusCode).json(errorResponse);
  }
}
