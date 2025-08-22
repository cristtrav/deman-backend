import { ColorRequiredFieldException } from "../exception/color-required-field.exception";

export class NewColor {
    private _id?: number
    private _descripcion: string

    constructor(descripcion: string, id?: number,) {
        if (descripcion == null) throw new ColorRequiredFieldException('Descripción');
        this._id = id
        this._descripcion = descripcion
    }

    get id(): number | undefined { return this._id }
    get descripcion(): string { return this._descripcion }
}