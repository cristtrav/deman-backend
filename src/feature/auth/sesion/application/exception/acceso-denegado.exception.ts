import { ApplicationException } from "@core/application/exception/application.exception";

export class AccesoDenegadoException extends ApplicationException {
    readonly code: string = 'FORBIDDEN';
    readonly statusCode: number = 403;

    constructor() {
        super('No tiene permiso para realizar esta operación');
    }
}
