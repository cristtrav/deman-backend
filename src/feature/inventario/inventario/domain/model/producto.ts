import { RequiredFieldException } from "@core/domain/exception/required-field.exception";
import { UnidadMedida } from "./unidad-medida";

export class Producto{
    private _id: number;
    private _descripcion: string;
    private _unidadMedida: UnidadMedida

    constructor(id: number, descripcion: string, unidadMedida: UnidadMedida){
        if(id == null) throw new RequiredFieldException('Producto', 'id');
        if(descripcion == null) throw new RequiredFieldException('Producto', 'descripcion');
        if(unidadMedida == null) throw new RequiredFieldException('Producto', 'unidadMedida');
        this._id = id;
        this._descripcion = descripcion;
        this._unidadMedida = unidadMedida;
    }

    get id(): number { return this._id }
    get descripcion(): string { return this._descripcion }
    get unidadMedida(): UnidadMedida { return this._unidadMedida }

    set id(value: number){
        if(value == null) throw new RequiredFieldException('Producto', 'id');
        this._id = value;
    }
    set descripcion(value: string){
        if(value == null) throw new RequiredFieldException('Producto', 'descripcion');
        this._descripcion = value;
    }
    set unidadMedida(val: UnidadMedida){
        if(val == null) throw new RequiredFieldException('Producto', 'unidadMedida');
        this._unidadMedida = val;
    }
}