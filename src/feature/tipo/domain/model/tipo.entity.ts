import { RequiredFieldException } from "../exception/required-field.exception";

export class Tipo {
    private id: number
    private descripcion: string
    private eliminado: boolean = false

    constructor(id: number, descripcion: string, eliminado: boolean = false) {
        if (id === null || id === undefined) throw new RequiredFieldException('ID');
        if (descripcion === null || descripcion === undefined) throw new RequiredFieldException('Descripción');
        if (eliminado) { this.eliminado = eliminado }
        this.id = id
        this.descripcion = descripcion
    }

    getId(): number { return this.id }
    getDescripcion(): string { return this.descripcion }
    isEliminado(): boolean { return this.eliminado }
}