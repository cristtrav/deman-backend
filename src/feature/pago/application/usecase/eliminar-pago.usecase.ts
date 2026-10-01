import { BaseUseCase } from "@core/application/usecase/base.usecase";
import { NotFoundException } from "@core/application/exception/not-found.exception";
import { PagoRepository } from "@feature/pago/domain/repository/pago.repository";
import { PedidoRepository } from "@feature/pago/domain/repository/pedido.repository";
import { EliminarPagoCommand } from "../contract/command/eliminar-pago.command";
import { SaldoPedidoService } from "../service/saldo-pedido.service";

export class EliminarPagoUseCase extends BaseUseCase<EliminarPagoCommand, void> {
    private readonly saldoPedidoService: SaldoPedidoService;

    constructor(
        private readonly pagoRepository: PagoRepository,
        private readonly pedidoRepository: PedidoRepository
    ){
        super();
        this.saldoPedidoService = new SaldoPedidoService(pagoRepository, pedidoRepository);
    }

    async execute(command: EliminarPagoCommand): Promise<void> {
        const pago = await this.pagoRepository.findById(command.data.id);
        if(pago == null) throw new NotFoundException('Pago', command.data.id);
        await this.pagoRepository.delete(command.data.id);
        await this.saldoPedidoService.recalcular(pago.pedido);
    }
}
