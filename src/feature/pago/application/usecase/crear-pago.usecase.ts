import { ResultContract } from "@core/application/contract/result/result.contract";
import { BaseUseCase } from "@core/application/usecase/base.usecase";
import { NotFoundException } from "@core/application/exception/not-found.exception";
import { PagoRepository } from "@feature/pago/domain/repository/pago.repository";
import { PedidoRepository } from "@feature/pago/domain/repository/pedido.repository";
import { NewPago } from "@feature/pago/domain/model/new-pago";
import { Temporal } from "@js-temporal/polyfill";
import { CrearPagoCommand } from "../contract/command/crear-pago.command";
import { PagoData } from "../contract/data/pago.data";
import { PagoDataMapper } from "../mapper/pago-data.mapper";

export class CrearPagoUseCase extends BaseUseCase<CrearPagoCommand, ResultContract<PagoData>> {

    constructor(
        private readonly pagoRepository: PagoRepository,
        private readonly pedidoRepository: PedidoRepository
    ) { super(); }

    async execute(command: CrearPagoCommand): Promise<ResultContract<PagoData>> {
        const pedido = await this.pedidoRepository.findById(command.data.pedidoId);
        if(pedido == null) throw new NotFoundException('Pedido', command.data.pedidoId);

        const newPago = new NewPago(
            pedido,
            Temporal.PlainDate.from(command.data.fecha),
            command.data.monto
        );
        const savedPago = await this.pagoRepository.create(newPago);
        return { data: PagoDataMapper.toData(savedPago) };
    }
}
