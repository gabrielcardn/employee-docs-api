import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const statusCode =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.message
        : 'Internal server error';

    if (statusCode === HttpStatus.INTERNAL_SERVER_ERROR) {
      this.logger.error(
        `Unhandled Exception: ${exception}`,
        (exception as Error).stack,
        `${request.method} ${request.url}`,
      );
    }

    const errorResponse = {
      statusCode: statusCode,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: message,
    };

    response.status(statusCode).json(errorResponse);
  }
}
