import { Temporal } from "@js-temporal/polyfill";
import { BusinessRuleException } from "@core/domain/exception/business-rule.exception";
import { Recibo } from "./recibo";

export type TipoMovimientoSaldo = 'EMISION' | 'ANULACION';

/**
 * Movimiento del historial de saldo de un pedido. La emisión de un recibo reduce el saldo
 * y su anulación lo restituye; ambos quedan registrados con el saldo antes y después.
 */
export class NewMovimientoSaldo {

    private constructor(
        public readonly pedidoId: number,
        public readonly reciboId: number,
        public readonly tipo: TipoMovimientoSaldo,
        public readonly fecha: Temporal.Instant,
        public readonly monto: number,
        public readonly saldoAnterior: number,
        public readonly saldoPosterior: number
    ){ }

    static emision(recibo: Recibo): NewMovimientoSaldo {
        return new NewMovimientoSaldo(
            recibo.datos.pedidoId,
            recibo.id,
            'EMISION',
            recibo.datos.fechaEmision,
            recibo.monto,
            recibo.datos.saldoAnterior,
            recibo.datos.saldoPosterior
        );
    }

    static anulacion(recibo: Recibo, saldoAnterior: number, saldoPosterior: number): NewMovimientoSaldo {
        if(!recibo.anulacion) throw new BusinessRuleException(`El recibo Nº ${recibo.numero} no está anulado`);
        if(Number(saldoAnterior) + Number(recibo.monto) != Number(saldoPosterior))
            throw new BusinessRuleException(`Los saldos de la anulación del recibo Nº ${recibo.numero} no son consistentes con su monto`);
        return new NewMovimientoSaldo(
            recibo.datos.pedidoId,
            recibo.id,
            'ANULACION',
            recibo.anulacion.fecha,
            recibo.monto,
            saldoAnterior,
            saldoPosterior
        );
    }
}
