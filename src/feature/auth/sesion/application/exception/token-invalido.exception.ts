import { ApplicationException } from "@core/application/exception/application.exception";

export class TokenInvalidoException extends ApplicationException {
    readonly code: string = 'INVALID_TOKEN';
    readonly statusCode: number = 401;

    constructor() {
        super('El token es inválido o ha expirado');
    }
}
