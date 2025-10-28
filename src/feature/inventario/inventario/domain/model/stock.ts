import { RequiredFieldException } from "@core/domain/exception/required-field.exception";
import { StockId } from "./stock-id";

export class Stock {
    private _id: StockId;
    private _cantidad: number;
    private _ultimaActualizacion: Date;
    private _cantidadMinima: number;
    
    constructor(
        id: StockId,
        cantidad: number,
        ultimaActualizacion: Date,
        cantidadMinima: number
    ){
        if(id == null) throw new RequiredFieldException('Stock', 'id');
        if(cantidad == null) throw new RequiredFieldException('Stock', 'cantidad');
        if(ultimaActualizacion == null) throw new RequiredFieldException('Stock', 'ultimaActualizacion');
        if(cantidadMinima == null) throw new RequiredFieldException('Stock', 'cantidadMinima');

        this._id = id;
        this._cantidad = cantidad;
        this._ultimaActualizacion = ultimaActualizacion;
        this._cantidadMinima = cantidadMinima;
    }

    get id(): StockId { return this._id; }
    get cantidad(): number { return this._cantidad; }
    get ultimaActualizacion(): Date { return this._ultimaActualizacion; }
    get cantidadMinima(): number { return this._cantidadMinima; }

    set id(val: StockId) { this._id = val; }
    set cantidad(val: number) { this._cantidad = val; }
    set ultimaActualizacion(val: Date) { this.ultimaActualizacion = val; }
    set cantidadMinima(val: number){ this._cantidadMinima = val; }
}