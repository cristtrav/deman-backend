import { MarcaRequiredFieldException } from "../exception/marca-required-field.exception"

export class NewMarca {
    private descripcion: string
    private eliminado: boolean = false

    constructor(descripcion: string, eliminado: boolean = false) {
        if (descripcion === null || descripcion === undefined) throw new MarcaRequiredFieldException('Descripción')
        if (eliminado) { this.eliminado = eliminado }
        this.descripcion = descripcion
    }

    getDescripcion(): string { return this.descripcion }
    isEliminado(): boolean { return this.eliminado }
}