import { NewDetalleInventario } from "@feature/inventario/inventario/domain/model/new-detalle-inventario";
import { DetalleInventarioTypeORMModel } from "../model/detalle-inventario.typeorm.model";

export class NewDetalleInventarioTypeORMMapper {
    static toORM(newDetalleInventario: NewDetalleInventario): DetalleInventarioTypeORMModel {
        const detalleInventarioOrm = new DetalleInventarioTypeORMModel();
        detalleInventarioOrm.idProducto = newDetalleInventario.producto.id;
        detalleInventarioOrm.idVariante = newDetalleInventario.variante.id;
        detalleInventarioOrm.cantidad = `${newDetalleInventario.cantidad}`;
        detalleInventarioOrm.diferencia = `${newDetalleInventario.diferencia}`;
        return detalleInventarioOrm;
    }
}