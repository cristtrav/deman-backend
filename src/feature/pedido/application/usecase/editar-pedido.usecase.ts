import { BaseUseCase } from "@core/application/usecase/base.usecase";
import { EditarPedidoCommand } from "../contract/command/editar-pedido.command";
import { ResultContract } from "@core/application/contract/result/result.contract";
import { PedidoData } from "../contract/data/pedido.data";
import { PedidoRepository } from "@feature/pedido/domain/repository/pedido.repository";
import { PedidoDataMapper } from "../mapper/pedido-data.mapper";
import { ClienteRepository } from "@feature/pedido/domain/repository/cliente.repository";
import { NotFoundException } from "@core/application/exception/not-found.exception";
import { Pedido } from "@feature/pedido/domain/model/pedido";
import { Temporal } from "@js-temporal/polyfill";
import { TransactionManager } from "@core/application/transaction/transaction-manager";

export class EditarPedidoUseCase extends BaseUseCase<EditarPedidoCommand, ResultContract<PedidoData>>{
    
    constructor(
        private readonly transactionManager: TransactionManager,
        private readonly pedidoRepository: PedidoRepository,
        private readonly clienteRepository: ClienteRepository
    ){ super(); }

    async execute(command: EditarPedidoCommand): Promise<ResultContract<PedidoData>> {
        return this.transactionManager.run(() => this.editar(command));
    }

    private async editar(command: EditarPedidoCommand): Promise<ResultContract<PedidoData>> {
        // Bloqueado para que no se registre un pago entre la validación del total y el guardado
        const previousPedido = await this.pedidoRepository.findByIdForUpdate(command.previousId);
        const cliente = await this.clienteRepository.findById(command.data.clienteId);

        if(previousPedido == null) throw new NotFoundException('Pedido', command.previousId);
        if(cliente == null) throw new NotFoundException('Cliente', command.data.clienteId);

        previousPedido.validarCambioDeTotal(command.data.total);

        const pedido = new Pedido(
            command.previousId,
            Temporal.PlainDate.from(command.data.fechaPedido),
            Temporal.PlainDate.from(command.data.fechaPedido),
            Temporal.PlainDate.from(command.data.fechaEntrega),
            command.data.fechaEntregado ? Temporal.PlainDate.from(command.data.fechaEntregado) : null ,
            true,
            command.data.fechaEntregado != null,
            cliente,
            command.data.total,
            command.data.descripcion,
            previousPedido.calcularSaldo(command.data.total),
            previousPedido.tienePagos
        );

        const savedPedido = await this.pedidoRepository.update(pedido);
        return { data: PedidoDataMapper.toData(savedPedido) }
    }

}