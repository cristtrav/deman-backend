import { Pedido } from "@feature/pago/domain/model/pedido";
import { PagoRepository } from "@feature/pago/domain/repository/pago.repository";
import { PedidoRepository } from "@feature/pago/domain/repository/pedido.repository";

/**
 * Calcula el saldo de un pedido a partir de sus pagos vigentes.
 * Se usa antes y después de registrar o anular un pago.
 */
export class SaldoPedidoService {

    constructor(
        private readonly pagoRepository: PagoRepository,
        private readonly pedidoRepository: PedidoRepository
    ) { }

    /**
     * Saldo actual del pedido según sus pagos vigentes, sin persistirlo.
     */
    async calcular(pedido: Pedido): Promise<number> {
        const pagos = await this.pagoRepository.findByPedido(pedido.id);
        pedido.actualizarSaldo(pagos);
        return pedido.saldo;
    }

    /**
     * Recalcula el saldo del pedido, lo persiste y lo devuelve.
     */
    async recalcular(pedido: Pedido): Promise<number> {
        const saldo = await this.calcular(pedido);
        await this.pedidoRepository.actualizarSaldo(pedido);
        return saldo;
    }
}
