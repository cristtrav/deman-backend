import { ColorRequiredFieldException } from "../exception/color-required-field.exception";

export class Color {
    private _id: number
    private _descripcion: string

    constructor(id: number, descripcion: string) {
        if (id == null) throw new ColorRequiredFieldException('ID');
        if (descripcion == null) throw new ColorRequiredFieldException('Descripción');
        this._id = id
        this._descripcion = descripcion
    }

    get id(): number { return this._id }
    get descripcion(): string { return this._descripcion }
}