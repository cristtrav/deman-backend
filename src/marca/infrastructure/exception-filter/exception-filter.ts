import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { Response } from 'express';
import { MarcaAlreadyExistsException } from "src/marca/application/exception/marca-already-exists.exception";
import { MarcaNotFoundException } from "src/marca/application/exception/marca-not-found.exception";

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: any = 'Internal server error';

    // 404
    if (exception instanceof MarcaNotFoundException ) {
      status = HttpStatus.NOT_FOUND;
      message = exception.message;
    }

    // 409
    if (exception instanceof MarcaAlreadyExistsException) {
      status = HttpStatus.CONFLICT;
      message = exception.message;
    }

    // HttpException genérica
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const responseMessage = exception.getResponse();
      message = typeof responseMessage === 'string' ? responseMessage : (responseMessage as any).message;
    }

    response.status(status).json({
      statusCode: status,
      message,
      timestamp: new Date().toISOString(),
    });
  }
}