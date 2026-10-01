import { Pedido } from "@feature/pago/domain/model/pedido";
import { PagoRepository } from "@feature/pago/domain/repository/pago.repository";
import { PedidoRepository } from "@feature/pago/domain/repository/pedido.repository";

/**
 * Recalcula y persiste el saldo de un pedido a partir de sus pagos vigentes.
 * Se usa luego de registrar, editar o eliminar un pago.
 */
export class SaldoPedidoService {

    constructor(
        private readonly pagoRepository: PagoRepository,
        private readonly pedidoRepository: PedidoRepository
    ) { }

    async recalcular(pedido: Pedido): Promise<void> {
        const pagos = await this.pagoRepository.findByPedido(pedido.id);
        pedido.actualizarSaldo(pagos);
        await this.pedidoRepository.actualizarSaldo(pedido);
    }
}
