import { RequiredFieldException } from "@core/domain/exception/required-field.exception"

export class UsuarioRequiredFieldException extends RequiredFieldException {
    constructor(fieldName: string) {
        super('Usuario', fieldName)
    }
}