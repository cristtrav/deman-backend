import { DomainException } from "@core/domain/exception/domain.exception";

export class ColorAlreadyExistsException extends DomainException {
    readonly code: string;
    readonly statusCode: number;

    constructor(descripcion: string) {
      super(`El color con descripción '${descripcion}' ya existe`);
      this.code = 'ENTITY_ALREADY_EXISTS';
      this.statusCode = 409;
    }
  }