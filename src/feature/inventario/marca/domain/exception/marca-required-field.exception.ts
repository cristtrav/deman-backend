import { RequiredFieldException } from "@core/domain/exception/required-field.exception";

export class MarcaRequiredFieldException extends RequiredFieldException{

    constructor(fieldName: string){
        super('Marca', fieldName);
    }

}