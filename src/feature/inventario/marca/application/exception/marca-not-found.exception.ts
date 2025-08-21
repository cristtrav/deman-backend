import { ApplicationException } from '@core/application/exception/application.exception';

export class MarcaNotFoundException extends ApplicationException {
    readonly code: string;
    readonly statusCode: number;
    
    constructor(descripcion: string) {
      super(`No se encontró la marca '${descripcion}'`);
      this.code = 'RESOURCE_NOT_FOUND';
      this.statusCode = 404;
    }
  }