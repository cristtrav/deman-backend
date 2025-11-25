import { NewInventario } from "@feature/inventario/inventario/domain/model/new-inventario";
import { InventarioTypeORMModel } from "../model/inventario.typeorm.model";
import { NewDetalleInventarioTypeORMMapper } from "./new-detalle-inventario.typeorm.mapper";
import { format } from 'date-fns';

export class NewInventarioTypeORMMapper{
    static toORM(newInventario: NewInventario): InventarioTypeORMModel{
        const newInventarioOrm = new InventarioTypeORMModel();
        newInventarioOrm.fecha = format(newInventario.fecha, 'yyyy-MM-dd');
        if(newInventario.observacion) newInventarioOrm.observacion = newInventario.observacion;
        newInventarioOrm.detalleInventario = newInventario.detalles.map(d => NewDetalleInventarioTypeORMMapper.toORM(d))
        return newInventarioOrm;
    }
}