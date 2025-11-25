import { RequiredFieldException } from "@core/domain/exception/required-field.exception";

export class StockId {
    private _idDeposito: number;
    private _idProducto: number;
    private _idVariante: number;

    constructor(
        idDeposito: number,
        idProducto: number,
        idVariante: number
    ){
        if(idDeposito == null) throw new RequiredFieldException('StockId', 'idDeposito');
        if(idProducto == null) throw new RequiredFieldException('StockId', 'idProducto');
        if(idVariante == null) throw new RequiredFieldException('StockId', 'idVariante');
        
        this._idDeposito = idDeposito;
        this._idProducto = idProducto;
        this._idVariante = idVariante;
    }

    get idDeposito(): number { return this._idDeposito; }
    get idProducto(): number { return this._idProducto; }
    get idVariante(): number { return this._idVariante; }
}