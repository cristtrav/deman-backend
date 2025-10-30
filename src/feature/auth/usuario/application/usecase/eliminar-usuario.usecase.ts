import { CommandContract } from "@core/application/contract/command/command.contract";
import { BaseUseCase } from "@core/application/usecase/base.usecase";
import { UsuarioRepository } from "../../domain/repository/usuario.repository";

interface UsuarioData {
    id: number
}

interface EliminarUsuarioCommand extends CommandContract<UsuarioData> { }

export class EliminarUsuarioUseCase extends BaseUseCase<EliminarUsuarioCommand, void> {

    constructor(
        private usuarioRepository: UsuarioRepository
    ) { super() }

    async execute(command: EliminarUsuarioCommand): Promise<void> {
        await this.usuarioRepository.delete(command.data.id);
    }

}