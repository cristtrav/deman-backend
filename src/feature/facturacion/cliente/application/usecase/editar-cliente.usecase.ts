import { CommandContract } from "@core/application/contract/command/command.contract";
import { ResultContract } from "@core/application/contract/result/result.contract";
import { Cliente } from "../../domain/model/cliente";
import { BaseUseCase } from "@core/application/usecase/base.usecase";
import { ClienteRepository } from "../../domain/repository/cliente.repository";

interface ClienteData {
    id: number,
    razonSocial: string,
    ruc: string,
    telefono: string
}

interface EditarClienteCommand extends CommandContract<ClienteData> {
    previousId: number
}

interface EditarClienteResult extends ResultContract<Cliente> { }

export class EditarClienteUseCase extends BaseUseCase<EditarClienteCommand, EditarClienteResult> {
    constructor(
        private clienteRepository: ClienteRepository
    ) { super() }
    async execute(command: EditarClienteCommand): Promise<EditarClienteResult> {
        const cliente = new Cliente(
            command.data.id,
            command.data.razonSocial,
            command.data.ruc,
            command.data.telefono
        )
        const savedCliente = await this.clienteRepository.edit(command.previousId, cliente)
        return { data: savedCliente }
    }
}