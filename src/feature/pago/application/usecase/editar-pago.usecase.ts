import { BaseUseCase } from "@core/application/usecase/base.usecase";
import { ResultContract } from "@core/application/contract/result/result.contract";
import { NotFoundException } from "@core/application/exception/not-found.exception";
import { PagoRepository } from "@feature/pago/domain/repository/pago.repository";
import { PedidoRepository } from "@feature/pago/domain/repository/pedido.repository";
import { Pago } from "@feature/pago/domain/model/pago";
import { Temporal } from "@js-temporal/polyfill";
import { EditarPagoCommand } from "../contract/command/editar-pago.command";
import { PagoData } from "../contract/data/pago.data";
import { PagoDataMapper } from "../mapper/pago-data.mapper";
import { SaldoPedidoService } from "../service/saldo-pedido.service";

export class EditarPagoUseCase extends BaseUseCase<EditarPagoCommand, ResultContract<PagoData>> {
    private readonly saldoPedidoService: SaldoPedidoService;

    constructor(
        private readonly pagoRepository: PagoRepository,
        private readonly pedidoRepository: PedidoRepository
    ){
        super();
        this.saldoPedidoService = new SaldoPedidoService(pagoRepository, pedidoRepository);
    }

    async execute(command: EditarPagoCommand): Promise<ResultContract<PagoData>> {
        const previousPago = await this.pagoRepository.findById(command.previousId);
        const pedido = await this.pedidoRepository.findById(command.data.pedidoId);

        if(previousPago == null) throw new NotFoundException('Pago', command.previousId);
        if(pedido == null) throw new NotFoundException('Pedido', command.data.pedidoId);

        const pago = new Pago(
            command.previousId,
            pedido,
            Temporal.PlainDate.from(command.data.fecha),
            command.data.monto
        );

        const savedPago = await this.pagoRepository.update(pago);
        await this.saldoPedidoService.recalcular(pedido);
        // Si el pago se movió a otro pedido, el pedido anterior también cambia de saldo
        if(previousPago.pedido.id != pedido.id) await this.saldoPedidoService.recalcular(previousPago.pedido);
        return { data: PagoDataMapper.toData(savedPago) };
    }
}
