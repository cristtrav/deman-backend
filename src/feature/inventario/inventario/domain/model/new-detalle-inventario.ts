import { RequiredFieldException } from "@core/domain/exception/required-field.exception";
import { Producto } from "./producto";
import { Variante } from "./variante";

export class NewDetalleInventario {
    private _producto: Producto;
    private _variante: Variante;
    private _cantidad: number;
    private _diferencia: number;

    constructor(
        producto: Producto,
        variante: Variante,
        cantidad: number,
        diferencia: number
    ){
        if(producto == null) throw new RequiredFieldException('DetalleInventario', 'producto');
        if(variante == null) throw new RequiredFieldException('DetalleInventario', 'variante');
        if(cantidad == null) throw new RequiredFieldException('DetalleInventario', 'cantidad');
        if(diferencia == null) throw new RequiredFieldException('DetalleInventario', 'diferencia');

        this._producto = producto;
        this._variante = variante;
        this._cantidad = cantidad;
        this._diferencia = diferencia;
    }

    get producto(): Producto { return this._producto }
    get variante(): Variante { return this._variante }
    get cantidad(): number { return this._cantidad }
    get diferencia(): number { return this._diferencia } 

    set producto(val: Producto) {
        if(val == null) throw new RequiredFieldException('DetalleInventario', 'producto');
        this._producto = val;
    }
    set variante(val: Variante) {
        if(val == null) throw new RequiredFieldException('DetalleInventario', 'variante');
        this._variante = val;
    }
    set cantidad(val: number){
        if(val == null) throw new RequiredFieldException('DetalleInventario', 'cantidad');
        this._cantidad = val;
    }
    set diferencia(val: number){
        if(val == null) throw new RequiredFieldException('DetalleInventario', 'diferencia');
        this._diferencia = val;
    }

    clone(): NewDetalleInventario {
        return new NewDetalleInventario(
            this._producto,
            this._variante,
            this._cantidad,
            this._diferencia
        );
    }
}