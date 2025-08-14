import { DomainException } from "@core/domain/exception/domain.exception";

export class MarcaAlreadyExistsException extends DomainException {
    readonly code: string;
    readonly statusCode: number;

    constructor(descripcion: string) {
      super(`La marca con descripción '${descripcion}' ya existe`);
      this.code = 'ENTITY_ALREADY_EXISTS';
      this.statusCode = 409;
    }
  }