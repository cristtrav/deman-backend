import { ArgumentsHost, Logger } from '@nestjs/common';
import { ApplicationException } from '@core/application/exception/application.exception';
import { TokenRequeridoException } from '@feature/auth/sesion/application/exception/token-requerido.exception';
import { GlobalExceptionFilter } from './global-exception.filter';

class FalloInternoException extends ApplicationException {
  readonly code: string = 'FALLO_INTERNO';
  readonly statusCode: number = 503;
}

describe('GlobalExceptionFilter', () => {
  let filter: GlobalExceptionFilter<unknown>;
  let warn: jest.SpyInstance;
  let error: jest.SpyInstance;
  let response: { status: jest.Mock; json: jest.Mock };
  let host: ArgumentsHost;

  beforeEach(() => {
    filter = new GlobalExceptionFilter();
    warn = jest.spyOn(Logger.prototype, 'warn').mockImplementation();
    error = jest.spyOn(Logger.prototype, 'error').mockImplementation();
    response = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    host = {
      switchToHttp: () => ({
        getResponse: () => response,
        getRequest: () => ({ method: 'GET', url: '/api/x', ip: '::1', headers: {} }),
      }),
    } as unknown as ArgumentsHost;
  });

  afterEach(() => jest.restoreAllMocks());

  it('should be defined', () => {
    expect(filter).toBeDefined();
  });

  it('registra una ApplicationException 4xx como advertencia, no como error inesperado', () => {
    filter.catch(new TokenRequeridoException(), host);

    expect(response.status).toHaveBeenCalledWith(401);
    expect(warn).toHaveBeenCalledWith(
      'Application Exception: Se requiere iniciar sesión',
      expect.any(String),
    );
    expect(error).not.toHaveBeenCalled();
  });

  it('registra una ApplicationException 5xx como error', () => {
    filter.catch(new FalloInternoException('Servicio no disponible'), host);

    expect(response.status).toHaveBeenCalledWith(503);
    expect(error).toHaveBeenCalledWith(
      'Application Exception: Servicio no disponible',
      expect.any(String),
      expect.any(String),
    );
    expect(warn).not.toHaveBeenCalled();
  });

  it('sigue registrando los errores no controlados como inesperados', () => {
    filter.catch(new Error('boom'), host);

    expect(response.status).toHaveBeenCalledWith(500);
    expect(error).toHaveBeenCalledWith(
      'Unexpected Exception: Error: boom',
      expect.any(String),
      expect.any(String),
    );
  });
});
