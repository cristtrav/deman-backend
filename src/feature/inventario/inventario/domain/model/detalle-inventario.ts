import { RequiredFieldException } from "@core/domain/exception/required-field.exception";
import { Producto } from "./producto";
import { Variante } from "./variante";

export class DetalleInventario {
    private _id: number;
    private _producto: Producto;
    private _variante: Variante;
    private _cantidad: number;
    private _cantidadPrevia: number;
    private _diferencia: number;

    constructor(
        id: number,
        producto: Producto,
        variante: Variante,
        cantidad: number,
        cantidadPrevia: number
    ){
        if(id == null) throw new RequiredFieldException('DetalleInventario', 'id');
        if(producto == null) throw new RequiredFieldException('DetalleInventario', 'producto');
        if(variante == null) throw new RequiredFieldException('DetalleInventario', 'variante');
        if(cantidad == null) throw new RequiredFieldException('DetalleInventario', 'cantidad');
        if(cantidadPrevia == null) throw new RequiredFieldException('DetalleInventario', 'cantidadPrevia');

        this._id = id;
        this._producto = producto;
        this._variante = variante;
        this._cantidad = cantidad;
        this._cantidadPrevia = cantidadPrevia;
        this._diferencia = cantidad - cantidadPrevia;
    }

    get id(): number { return this._id }
    get producto(): Producto { return this._producto }
    get variante(): Variante { return this._variante }
    get cantidad(): number { return this._cantidad }
    get cantidadPrevia(): number { return this._cantidadPrevia } 
    get diferencia(): number { return this._diferencia }

    set id(val: number){
        if(val == null) throw new RequiredFieldException('DetalleInventario', 'id');
        this._id = val;
    }
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
        this._diferencia = this._cantidad - this._cantidadPrevia;
    }
    set cantidadPrevia(val: number){
        if(val == null) throw new RequiredFieldException('DetalleInventario', 'cantidadPrevia');
        this._cantidadPrevia = val;
        this._diferencia = this._cantidad - this._cantidadPrevia;
    }

    clone(): DetalleInventario {
        return new DetalleInventario(
            this._id,
            this._producto,
            this._variante,
            this._cantidad,
            this._cantidadPrevia
        );
    }
}