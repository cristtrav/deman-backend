import { CommandContract } from "@core/application/contract/command/command.contract";
import { ResultContract } from "@core/application/contract/result/result.contract";
import { Usuario } from "../../domain/model/usuario.entity";
import { BaseUseCase } from "@core/application/usecase/base.usecase";
import { UsuarioRepository } from "../../domain/repository/usuario.repository";
import { NewUsuario } from "../../domain/model/new-usuario.entity";
import * as bcrypt from 'bcrypt';
import { normalizarCi } from "../../domain/util/normalizar-ci";

interface UsuarioData {
    id?: number;
    nombres: string;
    apellidos: string;
    ci: string,
    password: string;
    activo: boolean;
}

interface CrearUsuarioCommand extends CommandContract<UsuarioData> { }
interface CrearUsuarioResult extends ResultContract<Usuario> { }
export class CrearUsuarioUseCase extends BaseUseCase<CrearUsuarioCommand, CrearUsuarioResult> {
    constructor(readonly usuarioRepository: UsuarioRepository) { super() }

    async execute(command: CrearUsuarioCommand): Promise<CrearUsuarioResult> {
        const hashedPassword = await bcrypt.hash(command.data.password, 10)
        const newUsuario = new NewUsuario(
            command.data.nombres,
            command.data.apellidos,
            // Debe coincidir con la normalización del login. Si falta, la entidad informa el campo requerido
            command.data.ci == null ? command.data.ci : normalizarCi(command.data.ci),
            hashedPassword,
            command.data.activo,
            command.data.id
        )
        return { data: await this.usuarioRepository.create(newUsuario) }
    }
}