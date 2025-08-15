import { RequiredFieldException } from "../exception/required-field.exception";

export class NewTipo {
    private descripcion: string
    private eliminado: boolean = false

    constructor( descripcion: string, eliminado: boolean = false) {
        if (descripcion === null || descripcion === undefined) throw new RequiredFieldException('Descripción');
        if (eliminado) { this.eliminado = eliminado }
        this.descripcion = descripcion
    }

    getDescripcion(): string { return this.descripcion }
    isEliminado(): boolean { return this.eliminado }
}