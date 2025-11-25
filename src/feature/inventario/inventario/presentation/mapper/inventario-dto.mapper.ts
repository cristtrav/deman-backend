import { Inventario } from "../../domain/model/inventario";
import { InventarioDTO } from "../dto/inventario.dto";
import { DetalleInventarioDTOMapper } from "./detalle-inventario-dto.mapper";
import { format } from 'date-fns';

export class InventarioDTOMapper {
    static toDTO(inventario: Inventario): InventarioDTO {
        return {
            id: inventario.id,
            fecha: format(inventario.fecha, "yyyy-MM-dd"),
            observacion: inventario.observacion,
            detalles: inventario.detalles.map(d => DetalleInventarioDTOMapper.toDTO(d))
        }
    }
}