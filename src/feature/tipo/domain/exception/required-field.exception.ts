import { DomainException } from "@core/domain/exception/domain.exception";

export class RequiredFieldException extends DomainException{
    readonly code: string;
    readonly statusCode: number;

    constructor(fieldName: string){
        super(`El campo '${fieldName}' es requerido`);
        this.code = 'FIELD_REQUIRED';
        this.statusCode = 400;
    }

}