import { ApplicationException } from "@core/application/exception/application.exception";

export class UsuarioInactivoException extends ApplicationException {
    readonly code: string = 'INACTIVE_USER';
    readonly statusCode: number = 403;

    constructor() {
        super('El usuario se encuentra inactivo');
    }
}
