import { RequiredFieldException } from "@core/domain/exception/required-field.exception";

export class TipoRequiredFieldException extends RequiredFieldException{

    constructor(fieldName: string){
        super('Tipo', fieldName);
    }

}