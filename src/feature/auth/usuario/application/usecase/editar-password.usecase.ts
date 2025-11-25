import { CommandContract } from "@core/application/contract/command/command.contract";
import { BaseUseCase } from "@core/application/usecase/base.usecase"
import { UsuarioRepository } from "../../domain/repository/usuario.repository";
import * as bcrypt from 'bcrypt';

interface EditarPasswordCommand extends CommandContract<string> {
    previousId: number;
}
export class EditarPasswordUseCase extends BaseUseCase<EditarPasswordCommand, void> {
    constructor(
        private usuarioRepository: UsuarioRepository
    ) { super() }

    async execute(command: EditarPasswordCommand): Promise<void> {
        const pass = command.data
        const hashedPassword = await bcrypt.hash(pass, 10)
        await this.usuarioRepository.editPassword(
            command.previousId,
            hashedPassword
        )
        return
    }
}