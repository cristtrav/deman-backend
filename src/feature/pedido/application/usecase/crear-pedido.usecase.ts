import { ResultContract } from "@core/application/contract/result/result.contract";
import { BaseUseCase } from "@core/application/usecase/base.usecase";
import { ClienteRepository } from "@feature/pedido/domain/repository/cliente.repository";
import { PedidoRepository } from "@feature/pedido/domain/repository/pedido.repository";
import { Temporal } from "@js-temporal/polyfill";
import { CrearPedidoCommand } from "../contract/command/crear-pedido.command";
import { NewPedido } from "@feature/pedido/domain/model/new-pedido";
import { PedidoData } from "../contract/data/pedido.data";
import { PedidoDataMapper } from "../mapper/pedido-data.mapper";

export class CrearPedidoUseCase extends BaseUseCase<CrearPedidoCommand, ResultContract<PedidoData>> {
    
    constructor(
        private readonly pedidoRepository: PedidoRepository,
        private readonly clienteRepository: ClienteRepository
    ) { super(); }

    async execute(command: CrearPedidoCommand): Promise<ResultContract<PedidoData>> {
        const cliente = await this.clienteRepository.findById(command.data.clienteId)
        if (!cliente) throw new Error("Cliente no encontrado")
        
        const newPedido = new NewPedido(            
            Temporal.PlainDate.from(command.data.fechaPedido),
            Temporal.PlainDate.from(command.data.fechaConfirmacion),
            Temporal.PlainDate.from(command.data.fechaEntrega),
            command.data.confirmado,
            command.data.entregado,
            cliente,
            command.data.total,
            command.data.descripcion
        )
        const savedPedido = await this.pedidoRepository.create(newPedido);
        return { data: PedidoDataMapper.toData(savedPedido) };
    }
}