import { Pago } from "@feature/pago/domain/model/pago";
import { NewPago } from "@feature/pago/domain/model/new-pago";
import { PagoData } from "@feature/pago/application/contract/data/pago.data";
import { Temporal } from "@js-temporal/polyfill";
import { PagoTypeORMModel } from "../model/pago.typeorm.model";
import { PedidoTypeORMMapper } from "./pedido.typeorm.mapper";

export class PagoTypeORMMapper {
    static toDomain(pagoOrm: PagoTypeORMModel): Pago {
        return new Pago(
            pagoOrm.id,
            PedidoTypeORMMapper.toDomain(pagoOrm.pedido),
            Temporal.PlainDate.from(pagoOrm.fecha),
            pagoOrm.monto
        );
    }

    static toORM(pago: NewPago | Pago): PagoTypeORMModel {
        const pagoOrm = new PagoTypeORMModel();
        if ('id' in pago) pagoOrm.id = pago.id;
        pagoOrm.pedido = PedidoTypeORMMapper.toORM(pago.pedido);
        pagoOrm.fecha = pago.fecha.toString();
        pagoOrm.monto = pago.monto;
        return pagoOrm;
    }

    static toData(pagoOrm: PagoTypeORMModel): PagoData {
        return {
            id: pagoOrm.id,
            pedidoId: pagoOrm.pedido.id,
            fecha: pagoOrm.fecha,
            monto: pagoOrm.monto
        };
    }
}
