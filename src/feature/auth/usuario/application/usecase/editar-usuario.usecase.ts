import { CommandContract } from "@core/application/contract/command/command.contract";
import { Usuario } from "../../domain/model/usuario.entity";
import { ResultContract } from "@core/application/contract/result/result.contract";
import { BaseUseCase } from "@core/application/usecase/base.usecase";
import { UsuarioRepository } from "../../domain/repository/usuario.repository";
import { normalizarCi } from "../../domain/util/normalizar-ci";

interface UsuarioData {
    id: number;
    nombres: string;
    apellidos: string;
    ci: string,
    password: string;
    activo: boolean;
}
interface EditarUsuarioCommand extends CommandContract<UsuarioData> {
    previousId: number;
}

interface EditarUsuarioResullt extends ResultContract<Usuario> { }
export class EditarUsuarioUseCase extends BaseUseCase<EditarUsuarioCommand, EditarUsuarioResullt> {
    constructor(
        private usuarioRepository: UsuarioRepository
    ) { super() }

    async execute(command: EditarUsuarioCommand): Promise<EditarUsuarioResullt> {
        const usuario = new Usuario(
            command.data.id,
            command.data.nombres,
            command.data.apellidos,
            // Debe coincidir con la normalización del login. Si falta, la entidad informa el campo requerido
            command.data.ci == null ? command.data.ci : normalizarCi(command.data.ci),
            command.data.password,
            command.data.activo
        )
        const savesUsuario = await this.usuarioRepository.edit(command.previousId, usuario)
        return { data: savesUsuario }
    }
}