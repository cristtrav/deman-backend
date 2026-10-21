import { CommandContract } from "@core/application/contract/command/command.contract";
import { BaseUseCase } from "@core/application/usecase/base.usecase";
import { UsuarioRepository } from "../../domain/repository/usuario.repository";
import { BusinessRuleException } from "@core/domain/exception/business-rule.exception";

interface UsuarioData {
    id: number
}

interface EliminarUsuarioCommand extends CommandContract<UsuarioData> {
    // Usuario que realiza la eliminación
    solicitanteId: number;
}

export class EliminarUsuarioUseCase extends BaseUseCase<EliminarUsuarioCommand, void> {

    constructor(
        private usuarioRepository: UsuarioRepository
    ) { super() }

    async execute(command: EliminarUsuarioCommand): Promise<void> {
        if (command.data.id == command.solicitanteId) throw new BusinessRuleException('No puede eliminar su propio usuario')
        await this.usuarioRepository.delete(command.data.id);
    }

}