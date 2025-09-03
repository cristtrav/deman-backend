import { ProductoTypeORMModel } from "../model/producto.typeorm.model";
import { NewProducto } from "@feature/inventario/producto/domain/model/new-producto";

export class NewProductoTypeORMMapper{
    static toORM(newProducto: NewProducto): ProductoTypeORMModel{
        const productoTypeOrm = new ProductoTypeORMModel();
        if(newProducto.id != null) productoTypeOrm.id = newProducto.id;
        productoTypeOrm.descripcion = newProducto.descripcion;
        productoTypeOrm.precio = newProducto.precio;
        productoTypeOrm.idMarca = newProducto.marca.id;
        productoTypeOrm.idTipo = newProducto.tipo.id;
        productoTypeOrm.idCategoria = newProducto.categoria.id;
        productoTypeOrm.idUnidadMedida = newProducto.unidadMedida.id;
        return productoTypeOrm;
    }
}