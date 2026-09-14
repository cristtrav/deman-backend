import { RequiredFieldException } from "@core/domain/exception/required-field.exception";
import { Producto } from "./producto";

export class NewDetalleVenta {
    private _cantidad: number;
    private _precio: number;
    private _subtotal: number;
    private _producto: Producto;

    constructor(
        cantidad: number,
        precio: number,
        producto: Producto
    ){
        if(cantidad == null) throw new RequiredFieldException('DetalleVenta', 'cantidad');
        if(precio == null) throw new RequiredFieldException('DetalleVenta', 'precio');
        if(producto == null) throw new RequiredFieldException('DetalleVanta', 'producto');

        this._cantidad = cantidad;
        this._precio = precio;
        this._subtotal = cantidad * precio;
        this._producto = producto;
    }

    get cantidad(): number { return this._cantidad }
    get precio(): number { return this._precio }
    get subtotal(): number { return this._subtotal }
    get producto(): Producto { return this._producto }

    clone(): NewDetalleVenta {
        return new NewDetalleVenta(
            this._cantidad,
            this._precio,
            this._producto.clone()
        );
    }
}