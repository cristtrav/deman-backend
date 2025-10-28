import { NewInventario } from "@feature/inventario/inventario/domain/model/new-inventario";
import { InventarioTypeORMModel } from "../model/inventario.typeorm.model";
import { NewDetalleInventarioTypeORMMapper } from "./new-detalle-inventario.typeorm.mapper";
import { format } from 'date-fns';

export class NewInventarioTypeORMMapper{
    static toORM(newInventario: NewInventario): InventarioTypeORMModel{
        console.log('orm date')
        console.log(format(newInventario.fecha, 'yyyy-MM-dd'))
        const newInventarioOrm = new InventarioTypeORMModel();
        newInventarioOrm.fecha = format(newInventario.fecha, 'yyyy-MM-dd');
        newInventarioOrm.detalleInventario = newInventario.detalles.map(d => NewDetalleInventarioTypeORMMapper.toORM(d))
        return newInventarioOrm;
    }
}