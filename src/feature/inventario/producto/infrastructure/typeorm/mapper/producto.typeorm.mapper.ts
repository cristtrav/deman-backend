import { Producto } from "@feature/inventario/producto/domain/model/producto";
import { ProductoTypeORMModel } from "../model/producto.typeorm.model";
import { UnidadMedidaTypeORMMapper } from "./unidad-medida.typeorm.model";
import { MarcaTypeORMMapper } from "./marca-typeorm.mapper";
import { CategoriaTypeORMMapper } from "./categoria-typeorm.mapper";
import { TipoTypeORMMapper } from "./tipo-typeorm.mapper";

export class ProductoTypeORMMapper{
    static toDomain(productoTypeOrm: ProductoTypeORMModel): Producto{
        return new Producto(
            productoTypeOrm.id,
            productoTypeOrm.descripcion,
            productoTypeOrm.precio,
            UnidadMedidaTypeORMMapper.toDomain(productoTypeOrm.unidadMedida),
            MarcaTypeORMMapper.toDomain(productoTypeOrm.marca),
            CategoriaTypeORMMapper.toDomain(productoTypeOrm.categoria),
            TipoTypeORMMapper.toDomain(productoTypeOrm.tipo)
        )
    }

    static toORM(newProducto: Producto): ProductoTypeORMModel{
        const productoTypeOrm = new ProductoTypeORMModel();
        productoTypeOrm.id = newProducto.id;
        productoTypeOrm.descripcion = newProducto.descripcion;
        productoTypeOrm.precio = newProducto.precio;
        productoTypeOrm.idMarca = newProducto.marca.id;
        productoTypeOrm.idTipo = newProducto.tipo.id;
        productoTypeOrm.idCategoria = newProducto.categoria.id;
        productoTypeOrm.idUnidadMedida = newProducto.unidadMedida.id;
        return productoTypeOrm;
    }
}