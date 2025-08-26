import { ApplicationException } from '@core/application/exception/application.exception';

export class ColorNotFoundException extends ApplicationException {
    readonly code: string;
    readonly statusCode: number;
    
    constructor(descripcion: string) {
      super(`No se encontró el color '${descripcion}'`);
      this.code = 'NOT_FOUND_EXCEPTION';
      this.statusCode = 404;
    }
  }