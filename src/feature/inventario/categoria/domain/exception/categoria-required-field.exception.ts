import { RequiredFieldException } from "@core/domain/exception/required-field.exception";

export class CategoriaRequiredFieldException extends RequiredFieldException{
    constructor(fieldName: string){
        super("Categoría", fieldName);
    }
}