import { NotFoundException } from "@core/application/exception/not-found.exception";
import { Producto } from "./producto";
import { ProductoVarianteId } from "./producto-variante-id";
import { Variante } from "./variante";

export class ProductoVariante{
    private _id: ProductoVarianteId
    private _producto: Producto
    private _variante: Variante

    constructor(id: ProductoVarianteId, producto: Producto, variante: Variante){
        if(id == null) throw new NotFoundException('ProductoVariante', 'id');
        if(producto == null) throw new NotFoundException('ProductoVariante', 'producto');
        if(variante == null) throw new NotFoundException('ProductoVariante', 'variante');

        this._id = id;
        this._producto = producto;
        this._variante = variante;
    }

    get id(): ProductoVarianteId { return this._id }
    get producto(): Producto { return this._producto }
    get variante(): Variante { return this._variante }

    set id(id: ProductoVarianteId){
        if(id == null) throw new NotFoundException('ProductoVariante', 'id');
        this._id = id;
    }
    set producto(producto: Producto){
        if(producto == null) throw new NotFoundException('ProductoVariante', 'producto');
        this._producto = producto;
    }
    set variante(variante: Variante){
        if(variante == null) throw new NotFoundException('ProductoVariante', 'variante');
        this._variante = variante;
    }
}