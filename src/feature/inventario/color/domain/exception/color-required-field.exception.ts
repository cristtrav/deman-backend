import { RequiredFieldException } from "@core/domain/exception/required-field.exception";

export class ColorRequiredFieldException extends RequiredFieldException{

    constructor(fieldName: string){
        super('Color', fieldName);
    }

}