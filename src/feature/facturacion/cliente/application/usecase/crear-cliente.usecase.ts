import { CommandContract } from "@core/application/contract/command/command.contract";
import { ResultContract } from "@core/application/contract/result/result.contract";
import { Cliente } from "../../domain/model/cliente";
import { BaseUseCase } from "@core/application/usecase/base.usecase";
import { NewCliente } from "../../domain/model/new-cliente";
import { ClienteRepository } from "../../domain/repository/cliente.repository";

interface ClienteData {
    id?: number;
    razonSocial: string;
    ruc: string;
    telefono: string
}

interface CrearClienteCommand extends CommandContract<ClienteData> { }
interface CrearClienteResult extends ResultContract<Cliente> { }

export class CrearClienteUseCase extends BaseUseCase<CrearClienteCommand, CrearClienteResult> {
    constructor(readonly clienteRepository: ClienteRepository) { super() }

    async execute(command: CrearClienteCommand): Promise<CrearClienteResult> {
        const newCliente = new NewCliente(
            command.data.razonSocial,
            command.data.ruc,
            command.data.telefono,
            command.data.id
        )
        return { data: await this.clienteRepository.create(newCliente) }
    }
}