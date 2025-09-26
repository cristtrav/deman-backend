import { RequiredFieldException } from "@core/domain/exception/required-field.exception"
import { Conjugacion } from "./conjugacion"

export class UnidadMedida {
    private _id: string
    private _descripcion: Conjugacion
    private _abreviatura: Conjugacion

    constructor(
        id: string,
        descripcion: Conjugacion,
        abreviatura: Conjugacion
    ){
        if(id == null) throw new RequiredFieldException('UnidadMedida', 'id');
        if(descripcion == null) throw new RequiredFieldException('UnidadMedida', 'descripcion');
        if(abreviatura == null) throw new RequiredFieldException('UnidadMedida', 'abreviatura');
        this._id = id;
        this._descripcion = descripcion;
        this._abreviatura = abreviatura;
    }

    get id(): string { return this._id }
    get descripcion(): Conjugacion { return this._descripcion }
    get abreviatura(): Conjugacion { return this._abreviatura }
}