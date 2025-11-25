import { DetalleInventario } from "@feature/inventario/inventario/domain/model/detalle-inventario";
import { DetalleInventarioTypeORMModel } from "../model/detalle-inventario.typeorm.model";
import { ProductoTypeORMMapper } from "./producto.typeorm.mapper";
import { VarianteTypeORMMapper } from "./variante.typeorm.mapper";

export class DetalleInventarioTypeORMMapper{
    static toDomain(detalleInventarioOrm: DetalleInventarioTypeORMModel): DetalleInventario {
        const detalleInventario = new DetalleInventario(
            detalleInventarioOrm.id,
            ProductoTypeORMMapper.toDomain(detalleInventarioOrm.producto),
            VarianteTypeORMMapper.toDomain(detalleInventarioOrm.variante),
            Number(detalleInventarioOrm.cantidad),
            Number(detalleInventarioOrm.cantidadPrevia)
        );
        return detalleInventario;
    }

    static toORM(detalleInventario: DetalleInventario): DetalleInventarioTypeORMModel {
        const detalleOrm = new DetalleInventarioTypeORMModel();
        detalleOrm.id = detalleInventario.id;
        detalleOrm.idProducto = detalleInventario.producto.id;
        detalleOrm.idVariante = detalleInventario.variante.id;
        detalleOrm.cantidad = `${detalleInventario.cantidad}`;
        detalleOrm.cantidadPrevia = `${detalleInventario.cantidadPrevia}`
        return detalleOrm;
    }
}