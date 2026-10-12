import { ApplicationException } from "@core/application/exception/application.exception";

export class CredencialesInvalidasException extends ApplicationException {
    readonly code: string = 'INVALID_CREDENTIALS';
    readonly statusCode: number = 401;

    constructor() {
        super('CI o contraseña incorrectos');
    }
}
