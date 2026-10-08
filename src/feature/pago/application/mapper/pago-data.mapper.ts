import { Pago } from "@feature/pago/domain/model/pago";
import { Recibo } from "@feature/pago/domain/model/recibo";
import { PagoData } from "../contract/data/pago.data";

export class PagoDataMapper {
    static toData(pago: Pago, recibo?: Recibo): PagoData {
        return {
            id: pago.id,
            pedidoId: pago.pedido.id,
            fecha: pago.fecha.toString(),
            monto: pago.monto,
            numeroRecibo: recibo?.numero
        };
    }
}
