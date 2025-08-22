import { DomainException } from "@core/domain/exception/domain.exception";

export class FieldValidationException extends DomainException{
    readonly code: string;
    readonly statusCode: number;

    constructor(resource: string, fieldName: string, cause: string, value?: any){
        const message = value != null
        ? `Error de validación en ${resource}. Campo:'${fieldName}', Causa: ${cause}, Valor: '${value}'`
        : `Error de validación en ${resource}. Campo:'${fieldName}', Causa: ${cause}`
        super(message);
        this.code = 'FIELD_VALIDATION_ERROR';
        this.statusCode = 400;
    }

}