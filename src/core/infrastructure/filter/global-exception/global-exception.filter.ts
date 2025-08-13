import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger, ValidationError } from '@nestjs/common';
import { Request, Response } from 'express';
import { DomainException } from 'src/core/domain/exception/domain.exception';
import { ErrorResponseDTO, ValidationErrorDetail } from 'src/core/presentation/dto/error-response.dto';

@Catch()
export class GlobalExceptionFilter<T> implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const errorResponse = this.buildErrorResponse(exception);
    this.logError(exception, request, errorResponse);

    response.status(errorResponse.error.statusCode).json(errorResponse);
  }

  private buildErrorResponse(exception: unknown): ErrorResponseDTO {

    //Excepciones de dominio
    if(exception instanceof DomainException){
      return ErrorResponseDTO.error(exception.message, {
        code: exception.code,
        statusCode: exception.statusCode,
        details: (exception as any).details
      });
    }

    //Excepciones HTTP de NestJS
    if(exception instanceof HttpException){
      const status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      if(this.isValidationError(exceptionResponse))
      return this.buildValidationErrorResponse(exceptionResponse as any);

      return ErrorResponseDTO.error(this.extractMessage(exceptionResponse), {
        code: this.getHttpErrorCode(status),
        statusCode: status,
        details: typeof exceptionResponse === 'object' ? exceptionResponse : undefined,
      });
    }

    //Errores inesperados
    return ErrorResponseDTO.error('Error inesperado', {
      code: 'INTERNAL_SERVER_ERROR',
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR
    });
  }

   private buildValidationErrorResponse(
    exceptionResponse: any
  ): ErrorResponseDTO {
    const details: ValidationErrorDetail[] = [];

    if (Array.isArray(exceptionResponse.message)) {
      exceptionResponse.message.forEach((error: ValidationError) => {
        if (typeof error === 'object' && error.property) {
          const constraints = error.constraints || {};
          Object.values(constraints).forEach((message) => {
            details.push({
              field: error.property,
              message: message as string,
              value: error.value,
            });
          });
        }
      });
    }

    return ErrorResponseDTO.error('Error de validación', {
      code: 'VALIDATION_ERROR',
      details,
      statusCode: 400,
    });
  }

   private isValidationError(exceptionResponse: any): boolean {
    return (
      typeof exceptionResponse === 'object' &&
      Array.isArray(exceptionResponse.message) &&
      exceptionResponse.message.some(
        (msg: any) => typeof msg === 'object' && msg.property && msg.constraints
      )
    );
  }

  private extractMessage(exceptionResponse: any): string {
    if (typeof exceptionResponse === 'string') {
      return exceptionResponse;
    }
    if (typeof exceptionResponse === 'object' && exceptionResponse.message) {
      return Array.isArray(exceptionResponse.message)
        ? exceptionResponse.message[0]
        : exceptionResponse.message;
    }
    return 'An error occurred';
  }

  private getHttpErrorCode(status: number): string {
    const codes: Record<number, string> = {
      400: 'BAD_REQUEST',
      401: 'UNAUTHORIZED',
      403: 'FORBIDDEN',
      404: 'NOT_FOUND',
      409: 'CONFLICT',
      422: 'UNPROCESSABLE_ENTITY',
      500: 'INTERNAL_SERVER_ERROR',
    };
    return codes[status] || 'HTTP_ERROR';
  }

  private logError(
    exception: unknown,
    request: Request,
    errorResponse: ErrorResponseDTO
  ): void {
    const { method, url, ip, headers } = request;
    const userAgent = headers['user-agent'] || '';
    
    const logContext = {
      method,
      url,
      ip,
      userAgent,
      statusCode: errorResponse.error.statusCode,
      errorCode: errorResponse.error.code,
      timestamp: errorResponse.timestamp,
    };

    if (exception instanceof DomainException) {
      // Los errores de dominio son esperados, log con nivel INFO
      this.logger.warn(
        `Domain Exception: ${exception.message}`,
        JSON.stringify(logContext)
      );
    } else if (exception instanceof HttpException) {
      const status = exception.getStatus();
      if (status >= 500) {
        this.logger.error(
          `HTTP Exception: ${exception.message}`,
          exception.stack,
          JSON.stringify(logContext)
        );
      } else {
        this.logger.warn(
          `HTTP Exception: ${exception.message}`,
          JSON.stringify(logContext)
        );
      }
    } else {
      // Errores inesperados requieren atención inmediata
      this.logger.error(
        `Unexpected Exception: ${exception}`,
        exception instanceof Error ? exception.stack : '',
        JSON.stringify(logContext)
      );
    }
  }
}
