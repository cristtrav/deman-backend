import { BaseUseCase } from "@core/application/usecase/base.usecase";
import { ConsultarPedidoPorIdResult } from "../contract/result/consultar-pedido-por-id.result";
import { PedidoRepository } from "@feature/pedido/domain/repository/pedido.repository";
import { PedidoDataMapper } from "../mapper/pedido-data.mapper";
import { NotFoundException } from "@core/application/exception/not-found.exception";

export class ConsultarPedidoPorIdUseCase extends BaseUseCase<number, ConsultarPedidoPorIdResult> {
    constructor(
        private readonly pedidoRepository: PedidoRepository        
    ) { super(); }

    async execute(id: number): Promise<ConsultarPedidoPorIdResult> {
        const pedido = await this.pedidoRepository.findById(id);
        if (!pedido) throw new NotFoundException("Pedido", id);
        return { data: PedidoDataMapper.toData(pedido) };
    }
}