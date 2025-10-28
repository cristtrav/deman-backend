import { RequiredFieldException } from "@core/domain/exception/required-field.exception";

export class Categoria {
    private _id: number;
    private _descripcion: string;

    constructor(id: number, descripcion: string){
        if(id == null) throw new RequiredFieldException('Categoría', 'id');
        if(descripcion == null) throw new RequiredFieldException('Categoría', 'descripcion');

        this._id = id;
        this._descripcion = descripcion;
    }

    get id(): number { return this._id }
    get descripcion(){ return this._descripcion }
}