import { RequiredFieldException } from "@core/domain/exception/required-field.exception";
import { Producto } from "./producto";

export class DetalleVenta {
    private _id: number;
    private _cantidad: number;
    private _precio: number;
    private _subtotal: number;
    private _producto: Producto;

    constructor(
        id: number,
        cantidad: number,
        precio: number,
        producto: Producto
    ){
        if(id == null) throw new RequiredFieldException('DetalleVenta', 'id');
        if(cantidad == null) throw new RequiredFieldException('DetalleVenta', 'cantidad');
        if(precio == null) throw new RequiredFieldException('DetalleVenta', 'precio');
        if(producto == null) throw new RequiredFieldException('DetalleVanta', 'producto');

        this._id = id;
        this._cantidad = cantidad;
        this._precio = precio;
        this._subtotal = cantidad * precio;
        this._producto = producto;
    }

    get id(): number { return this._id }
    get cantidad(): number { return this._cantidad }
    get precio(): number { return this._precio }
    get subtotal(): number { return this._subtotal }
    get producto(): Producto { return this._producto }

    clone(): DetalleVenta {
        return new DetalleVenta(
            this._id,
            this._cantidad,
            this._precio,
            this._producto.clone()
        );
    }
}