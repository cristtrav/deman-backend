import { Inventario } from "@feature/inventario/inventario/domain/model/inventario";
import { InventarioTypeORMModel } from "../model/inventario.typeorm.model";
import { DetalleInventarioTypeORMMapper } from "./detalle-inventario.typeorm.mapper";
import { format } from "date-fns";

export class InventarioTypeORMMapper {
    static toDomain(inventarioOrm: InventarioTypeORMModel): Inventario {
        const inventario = new Inventario(inventarioOrm.id, new Date(`${inventarioOrm.fecha}T00:00:00`), inventarioOrm.observacion);
        inventario.agregarDetalles(
            inventarioOrm.detalleInventario.map(detalleOrm => DetalleInventarioTypeORMMapper.toDomain(detalleOrm))
        );
        return inventario;
    }

    static toORM(inventario: Inventario): InventarioTypeORMModel {
        const inventarioOrm = new InventarioTypeORMModel();
        inventarioOrm.id = inventario.id;
        inventarioOrm.fecha = format(inventario.fecha, "yyyy-MM-dd");
        if(inventario.observacion) inventarioOrm.observacion = inventario.observacion
        inventarioOrm.detalleInventario = inventario.detalles.map(
            di => DetalleInventarioTypeORMMapper.toORM(di)
        );
        return inventarioOrm;
    }
}