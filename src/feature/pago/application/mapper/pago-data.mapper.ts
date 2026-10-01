import { Pago } from "@feature/pago/domain/model/pago";
import { PagoData } from "../contract/data/pago.data";

export class PagoDataMapper {
    static toData(pago: Pago): PagoData {
        return {
            id: pago.id,
            pedidoId: pago.pedido.id,
            fecha: pago.fecha.toString(),
            monto: pago.monto
        };
    }
}
