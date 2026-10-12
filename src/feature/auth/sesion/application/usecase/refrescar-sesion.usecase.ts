import { CommandContract } from "@core/application/contract/command/command.contract";
import { ResultContract } from "@core/application/contract/result/result.contract";
import { BaseUseCase } from "@core/application/usecase/base.usecase";
import { CredencialReadRepository } from "../read-repository/credencial.read-repository";
import { TokenService } from "../port/token.service";
import { SesionResult } from "../contract/sesion.result";
import { TokenInvalidoException } from "../exception/token-invalido.exception";
import { UsuarioInactivoException } from "../exception/usuario-inactivo.exception";
import { generarSesion } from "./generar-sesion";

interface RefrescarSesionCommand extends CommandContract<string> { }
interface RefrescarSesionResult extends ResultContract<SesionResult> { }

export class RefrescarSesionUseCase extends BaseUseCase<RefrescarSesionCommand, RefrescarSesionResult> {
    constructor(
        private credencialReadRepository: CredencialReadRepository,
        private tokenService: TokenService
    ) { super() }

    async execute(command: RefrescarSesionCommand): Promise<RefrescarSesionResult> {
        const payload = await this.tokenService.verificarRefreshToken(command.data)

        // El usuario pudo haber sido eliminado o desactivado desde que se emitió el token
        const usuario = await this.credencialReadRepository.findById(payload.usuarioId)
        if (usuario == null) throw new TokenInvalidoException()
        if (!usuario.activo) throw new UsuarioInactivoException()

        return { data: await generarSesion(this.tokenService, usuario) }
    }
}
