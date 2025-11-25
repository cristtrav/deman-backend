import { RequiredFieldException } from "@core/domain/exception/required-field.exception";

export class ProductoVarianteId{
    private _idProducto: number;
    private _idVariante: number;

    constructor(idProducto: number, idVariante: number){
        if(idProducto == null) throw new RequiredFieldException('ProductoVarianteId', 'idProducto');
        if(idVariante == null) throw new RequiredFieldException('ProductoVarianteId', 'idVariante');

        this._idProducto = idProducto;
        this._idVariante = idVariante;
    }

    get idProducto(): number{ return this._idProducto }
    get idVariante(): number{ return this._idVariante }

    set idProducto(idProducto: number) {
        if(idProducto == null) throw new RequiredFieldException('ProductoVarianteId', 'idProducto');
        this._idProducto = idProducto;
    }
    set idVariante(idVariante: number){
        if(idVariante == null) throw new RequiredFieldException('ProductoVarianteId', 'idVariante');
        this._idVariante = idVariante;
    }
}