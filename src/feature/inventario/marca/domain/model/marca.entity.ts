import { MarcaRequiredFieldException } from "../exception/marca-required-field.exception"

export class Marca {
    readonly id: number
    readonly descripcion: string

    constructor(id: number, descripcion: string) {
        if (id === null || id === undefined) throw new MarcaRequiredFieldException('ID');
        if (descripcion === null || descripcion === undefined) throw new MarcaRequiredFieldException('Descripción');
        this.id = id
        this.descripcion = descripcion
    }
}