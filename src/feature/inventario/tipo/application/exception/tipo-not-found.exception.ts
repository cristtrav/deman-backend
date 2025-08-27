import { ApplicationException } from '@core/application/exception/application.exception';

export class TipoNotFoundException extends ApplicationException {
    readonly code: string;
    readonly statusCode: number;
    
    constructor(descripcion: string) {
      super(`No se encontró el tipo '${descripcion}'`);
      this.code = 'NOT_FOUND_EXCEPTION';
      this.statusCode = 404;
    }
  }