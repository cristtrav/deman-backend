import { BaseUseCase } from "@core/application/usecase/base.usecase";
import { EliminarPedidoCommand } from "../contract/command/eliminar-pedido.command";
import { PedidoRepository } from "@feature/pedido/domain/repository/pedido.repository";
import { NotFoundException } from "@core/application/exception/not-found.exception";

export class EliminarPedidoUseCase extends BaseUseCase<EliminarPedidoCommand, void>{
    
    constructor(
        private readonly pedidoRepository: PedidoRepository
    ){ super(); }
    
    async execute(command: EliminarPedidoCommand): Promise<void> {
        const pedido = await this.pedidoRepository.findById(command.data.id);
        if(pedido == null) throw new NotFoundException('Pedido', command.data.id);
        await this.pedidoRepository.delete(command.data.id);
    }

}