import { TipoRequiredFieldException } from "../exception/tipo-required-field.exception";

export class Tipo {
    private _id: number
    private _descripcion: string

    constructor(id: number, descripcion: string) {
        if (id == null) throw new TipoRequiredFieldException('ID');
        if (descripcion == null) throw new TipoRequiredFieldException('Descripción');
        this._id = id
        this._descripcion = descripcion
    }

    get id(): number { return this._id }
    get descripcion(): string { return this._descripcion }
}