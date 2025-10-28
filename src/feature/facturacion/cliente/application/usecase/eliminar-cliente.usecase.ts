import { CommandContract } from "@core/application/contract/command/command.contract";
import { BaseUseCase } from "@core/application/usecase/base.usecase";
import { ClienteRepository } from "../../domain/repository/cliente.repository";

interface ClienteData {
    id: number
}
interface EliminarClienteCommand extends CommandContract<ClienteData> { }

export class EliminarClienteUseCase extends BaseUseCase<EliminarClienteCommand, void> {
    constructor(private clienteRepository: ClienteRepository) { super() }

    async execute(command: EliminarClienteCommand): Promise<void> {
        await this.clienteRepository.delete(command.data.id)
    }
}