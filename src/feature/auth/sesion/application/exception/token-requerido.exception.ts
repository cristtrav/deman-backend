import { ApplicationException } from "@core/application/exception/application.exception";

export class TokenRequeridoException extends ApplicationException {
    readonly code: string = 'MISSING_TOKEN';
    readonly statusCode: number = 401;

    constructor() {
        super('Se requiere iniciar sesión');
    }
}
