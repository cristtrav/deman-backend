import { TotalVenta } from "@feature/facturacion/venta/domain/value/total-venta";
import { Venta } from "../../../domain/model/venta";
import { VentaTypeORMModel } from "../model/venta.typeorm.model";
import { ClienteTypeORMMapper } from "./cliente.typeorm.mapper";
import { TotalIvaVenta } from "@feature/facturacion/venta/domain/value/total-iva-venta";
import { NumeroFactura } from "@feature/facturacion/venta/domain/value/numero-factura";

export class VentaTypeORMMapper{
    static toDomain(ventaOrm: VentaTypeORMModel): Venta{
        return new Venta(
            ventaOrm.id,
            new Date(`${ventaOrm.fecha}T00:00:00`),
            ventaOrm.credito,
            ventaOrm.cancelado,
            ClienteTypeORMMapper.toDomain(ventaOrm.cliente),
            new TotalVenta(
                Number(ventaOrm.total),
                Number(ventaOrm.totalDescuento),
                Number(ventaOrm.totalInteres)
            ),
            new TotalIvaVenta(
                Number(ventaOrm.totalIva10),
                Number(ventaOrm.totalIva5),
                Number(ventaOrm.totalExento)
            ),
            ventaOrm.nroFactura != null ? new NumeroFactura(ventaOrm.nroFactura) : undefined,
            ventaOrm.fechaCancelacion != null ? new Date(`${ventaOrm.fechaCancelacion}T00:00:00`) : undefined,
            Number(ventaOrm.totalEntrega)
        );
    }
}