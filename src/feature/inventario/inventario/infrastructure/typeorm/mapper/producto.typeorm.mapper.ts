import { Producto } from "@feature/inventario/inventario/domain/model/producto";
import { ProductoTypeORMModel } from "../model/producto.typeorm.model";
import { UnidadMedidaTypeORMMapper } from "./unidad-medida.typeorm.model";

export class ProductoTypeORMMapper{
    static toDomain(productoOrm: ProductoTypeORMModel): Producto {
        return new Producto(
            productoOrm.id,
            productoOrm.descripcion,
            UnidadMedidaTypeORMMapper.toDomain(productoOrm.unidadMedida)
        );
    }
}