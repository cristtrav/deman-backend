import { DomainException } from "@core/domain/exception/domain.exception";

export class RequiredFieldException extends DomainException{
    readonly code: string;
    readonly statusCode: number;

    constructor(resource: string, fieldName: string){
        super(`'${fieldName}' es requerido en ${resource}`);
        this.code = 'REQUIRED_FIELD';
        this.statusCode = 400;
    }

}