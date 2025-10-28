import { EditInventario } from "@feature/inventario/inventario/domain/model/edit-inventario";
import { InventarioTypeORMModel } from "../model/inventario.typeorm.model";
import { format } from "date-fns";
import { DetalleInventario } from "@feature/inventario/inventario/domain/model/detalle-inventario";
import { DetalleInventarioTypeORMMapper } from "./detalle-inventario.typeorm.mapper";
import { NewDetalleInventarioTypeORMMapper } from "./new-detalle-inventario.typeorm.mapper";

export class EditInventarioTypeORMMapper {
    static toORM(editInventario: EditInventario): InventarioTypeORMModel {
        const inventarioOrm = new InventarioTypeORMModel();
        inventarioOrm.id = editInventario.id;
        inventarioOrm.fecha = format(editInventario.fecha, "yyyy/MM/dd");
        inventarioOrm.detalleInventario = editInventario.detalles.map(detalle => {
            if(detalle instanceof DetalleInventario) return DetalleInventarioTypeORMMapper.toORM(detalle);
            return NewDetalleInventarioTypeORMMapper.toORM(detalle);
        })
        return inventarioOrm;
    }
}