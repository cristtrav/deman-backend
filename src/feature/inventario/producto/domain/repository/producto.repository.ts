import { NewProducto } from "../model/new-producto";
import { Producto } from "../model/producto";

export abstract class ProductoRepository {
    abstract create(newProducto: NewProducto): Promise<Producto>;
    abstract edit(previousId: number, producto: Producto): Promise<Producto>;
    abstract delete(id: number): Promise<void>;
    abstract findById(id: number): Promise<Producto | undefined>;
}