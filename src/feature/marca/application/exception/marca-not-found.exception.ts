import { ApplicationException } from '@core/application/exception/application.exception';

export class MarcaNotFoundException extends ApplicationException {
    readonly code: string;
    readonly statusCode: number;
    
    constructor(descripcion: string) {
      super(`No se encontró la marca '${descripcion}'`);
      this.code = 'NOT_FOUND_EXCEPTION';
      this.statusCode = 404;
    }
  }