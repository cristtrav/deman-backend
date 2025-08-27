import { DomainException } from "@core/domain/exception/domain.exception";

export class TipoAlreadyExistsException extends DomainException {
    readonly code: string;
    readonly statusCode: number;

    constructor(descripcion: string) {
      super(`El tipo con descripción '${descripcion}' ya existe`);
      this.code = 'ENTITY_ALREADY_EXISTS';
      this.statusCode = 409;
    }
  }