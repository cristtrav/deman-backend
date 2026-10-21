import { CommandContract } from "@core/application/contract/command/command.contract";
import { Usuario } from "../../domain/model/usuario.entity";
import { ResultContract } from "@core/application/contract/result/result.contract";
import { BaseUseCase } from "@core/application/usecase/base.usecase";
import { UsuarioRepository } from "../../domain/repository/usuario.repository";
import { normalizarCi } from "../../domain/util/normalizar-ci";
import { BusinessRuleException } from "@core/domain/exception/business-rule.exception";

interface UsuarioData {
    id: number;
    nombres: string;
    apellidos: string;
    ci: string,
    activo: boolean;
    isAdmin: boolean;
}
interface EditarUsuarioCommand extends CommandContract<UsuarioData> {
    previousId: number;
    // Usuario que realiza la edición
    solicitanteId: number;
}

interface EditarUsuarioResullt extends ResultContract<Usuario> { }
export class EditarUsuarioUseCase extends BaseUseCase<EditarUsuarioCommand, EditarUsuarioResullt> {
    constructor(
        private usuarioRepository: UsuarioRepository
    ) { super() }

    async execute(command: EditarUsuarioCommand): Promise<EditarUsuarioResullt> {
        // Sin esta regla el único administrador podría quedar sin acceso a la gestión de usuarios
        if (command.previousId == command.solicitanteId && (command.data.isAdmin === false || command.data.activo === false))
            throw new BusinessRuleException('No puede quitarse el permiso de administrador ni desactivar su propio usuario')
        // La contraseña no viaja en la edición, solo se cambia por el endpoint de contraseña
        const actual = await this.usuarioRepository.findById(command.previousId)
        if (actual == null) throw new BusinessRuleException('El usuario no existe')
        const usuario = new Usuario(
            command.data.id,
            command.data.nombres,
            command.data.apellidos,
            // Debe coincidir con la normalización del login. Si falta, la entidad informa el campo requerido
            command.data.ci == null ? command.data.ci : normalizarCi(command.data.ci),
            actual.password,
            command.data.activo,
            command.data.isAdmin
        )
        const savesUsuario = await this.usuarioRepository.edit(command.previousId, usuario)
        return { data: savesUsuario }
    }
}