import { FieldValidationException } from "@core/domain/exception/field-validation.exception";

export class CategoriaFieldValidationException extends FieldValidationException{
    constructor(fieldName: string, cause: string, value?: any){
        super("Categoría", fieldName, cause, value);
    }
}