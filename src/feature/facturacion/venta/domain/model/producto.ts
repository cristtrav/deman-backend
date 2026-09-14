import { RequiredFieldException } from "@core/domain/exception/required-field.exception";

export class Producto {
    private _id: number;
    private _descripcion: string;

    constructor(
        id: number,
        descripcion: string
    ){
        if(id == null) throw new RequiredFieldException('Producto', 'id');
        if(descripcion == null) throw new RequiredFieldException('Producto', 'descripcion');

        this._id = id;
        this._descripcion = descripcion;
    }

    get id(): number { return this._id }
    get descripcion(): string { return this._descripcion }

    clone(): Producto {
        return new Producto(
            this._id,
            this._descripcion
        );
    }
}