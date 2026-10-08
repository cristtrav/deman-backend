import { BaseUseCase } from "@core/application/usecase/base.usecase";
import { NotFoundException } from "@core/application/exception/not-found.exception";
import { TransactionManager } from "@core/application/transaction/transaction-manager";
import { BusinessRuleException } from "@core/domain/exception/business-rule.exception";
import { PagoRepository } from "@feature/pago/domain/repository/pago.repository";
import { PedidoRepository } from "@feature/pago/domain/repository/pedido.repository";
import { ReciboRepository } from "@feature/pago/domain/repository/recibo.repository";
import { MovimientoSaldoRepository } from "@feature/pago/domain/repository/movimiento-saldo.repository";
import { NewMovimientoSaldo } from "@feature/pago/domain/model/new-movimiento-saldo";
import { Temporal } from "@js-temporal/polyfill";
import { AnularPagoCommand } from "../contract/command/anular-pago.command";
import { SaldoPedidoService } from "../service/saldo-pedido.service";

/**
 * Anula un pago y su recibo. La anulación queda registrada como un movimiento más del saldo
 * del pedido, de modo que los recibos emitidos después conservan los saldos con que se imprimieron.
 */
export class AnularPagoUseCase extends BaseUseCase<AnularPagoCommand, void> {
    private readonly saldoPedidoService: SaldoPedidoService;

    constructor(
        private readonly transactionManager: TransactionManager,
        private readonly pagoRepository: PagoRepository,
        private readonly pedidoRepository: PedidoRepository,
        private readonly reciboRepository: ReciboRepository,
        private readonly movimientoSaldoRepository: MovimientoSaldoRepository
    ){
        super();
        this.saldoPedidoService = new SaldoPedidoService(pagoRepository, pedidoRepository);
    }

    async execute(command: AnularPagoCommand): Promise<void> {
        await this.transactionManager.run(async () => {
            const pagoSinBloqueo = await this.pagoRepository.findById(command.data.id);
            if(pagoSinBloqueo == null) throw new NotFoundException('Pago', command.data.id);

            const pedido = await this.pedidoRepository.findByIdForUpdate(pagoSinBloqueo.pedido.id);
            if(pedido == null) throw new NotFoundException('Pedido', pagoSinBloqueo.pedido.id);

            // Se vuelve a leer con el pedido bloqueado por si otra operación lo anuló mientras tanto
            const pago = await this.pagoRepository.findById(command.data.id);
            if(pago == null) throw new NotFoundException('Pago', command.data.id);

            const recibo = await this.reciboRepository.findByPago(pago.id);
            if(recibo == null) throw new BusinessRuleException(`El pago «${pago.id}» no tiene un recibo emitido`);
            recibo.anular(command.data.motivo, Temporal.Now.instant());

            const saldoAnterior = await this.saldoPedidoService.calcular(pedido);
            await this.pagoRepository.delete(pago.id);
            const saldoPosterior = await this.saldoPedidoService.recalcular(pedido);

            await this.reciboRepository.update(recibo);
            await this.movimientoSaldoRepository.create(NewMovimientoSaldo.anulacion(recibo, saldoAnterior, saldoPosterior));
        });
    }
}
