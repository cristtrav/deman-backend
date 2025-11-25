import { DetalleInventarioDTO } from "./detalle-inventario.dto";

export class InventarioDTO {
    id: number;
    fecha: string;
    observacion?: string;
    detalles: DetalleInventarioDTO[];
}