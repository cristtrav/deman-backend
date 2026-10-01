import { BaseUseCase } from "@core/application/usecase/base.usecase";
import { ConsultarPagosResult } from "../contract/result/consultar-pagos.result";
import { PagoReadRepository } from "../read-repository/pago-read.repository";
import { PedidoRepository } from "@feature/pago/domain/repository/pedido.repository";
import { NotFoundException } from "@core/application/exception/not-found.exception";

export class ConsultarPagosPorPedidoUseCase extends BaseUseCase<number, ConsultarPagosResult> {

    constructor(
        private readonly pagoReadRepository: PagoReadRepository,
        private readonly pedidoRepository: PedidoRepository
    ) { super(); }

    async execute(pedidoId: number): Promise<ConsultarPagosResult> {
        const pedido = await this.pedidoRepository.findById(pedidoId);
        if(pedido == null) throw new NotFoundException('Pedido', pedidoId);
        return await this.pagoReadRepository.consultarPorPedido(pedidoId);
    }
}
