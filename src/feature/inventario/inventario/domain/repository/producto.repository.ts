import { Producto } from "../model/producto";

export abstract class ProductoRepository{
    abstract findById(id: number): Promise<Producto | null>;
}