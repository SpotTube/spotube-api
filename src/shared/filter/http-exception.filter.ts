import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { IErrorResponse } from '~/types/Error';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    // const request = ctx.getRequest<Request>();
    const statusCode = exception.getStatus();
    let errorResponse = exception.getResponse();
    let responseData: IErrorResponse = {
      statusCode,
      message: exception.message,
    };

    if (typeof errorResponse === 'string') {
      responseData.message = errorResponse;
    } else {
      const { invalid_fields, message } = errorResponse as any;
      console.log('message', message);

      responseData = {
        ...responseData,
        ...(invalid_fields && { error: { invalid_fields } }),
        ...(message && { message }),
      };
    }
    console.log(exception.message);

    response.status(statusCode).json(responseData);
  }
}
