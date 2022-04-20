import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import format from '../common/dateformat.util';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const code = exception.getStatus();
    const { msg } = exception.getResponse() as any;

    response.status(code).json({
      code,
      msg,
      path: request.url,
      timestamp: format(new Date(), 'yyyy-MM-dd hh:mm:ss'),
    });
  }
}
