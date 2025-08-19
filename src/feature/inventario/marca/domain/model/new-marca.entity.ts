import { MarcaRequiredFieldException } from "../exception/marca-required-field.exception"

export class NewMarca {
    readonly descripcion: string

    constructor(descripcion: string) {
        if (descripcion === null || descripcion === undefined) throw new MarcaRequiredFieldException('Descripción')
        this.descripcion = descripcion
    }
}