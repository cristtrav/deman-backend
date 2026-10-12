import { CommandContract } from "@core/application/contract/command/command.contract";
import { ResultContract } from "@core/application/contract/result/result.contract";
import { BaseUseCase } from "@core/application/usecase/base.usecase";
import { CredencialReadRepository } from "../read-repository/credencial.read-repository";
import { PasswordHasher } from "../port/password-hasher";
import { TokenService } from "../port/token.service";
import { SesionResult } from "../contract/sesion.result";
import { CredencialesInvalidasException } from "../exception/credenciales-invalidas.exception";
import { UsuarioInactivoException } from "../exception/usuario-inactivo.exception";
import { generarSesion } from "./generar-sesion";
import { normalizarCi } from "@feature/auth/usuario/domain/util/normalizar-ci";

interface CredencialData {
    ci: string;
    password: string;
}

interface IniciarSesionCommand extends CommandContract<CredencialData> { }
interface IniciarSesionResult extends ResultContract<SesionResult> { }

export class IniciarSesionUseCase extends BaseUseCase<IniciarSesionCommand, IniciarSesionResult> {
    constructor(
        private credencialReadRepository: CredencialReadRepository,
        private passwordHasher: PasswordHasher,
        private tokenService: TokenService
    ) { super() }

    async execute(command: IniciarSesionCommand): Promise<IniciarSesionResult> {
        const ci = normalizarCi(command.data.ci)
        const usuario = await this.credencialReadRepository.findByCi(ci)

        // Mismo error y mismo tiempo de respuesta para CI inexistente o contraseña incorrecta
        if (usuario == null) {
            await this.passwordHasher.simularComparacion(command.data.password)
            throw new CredencialesInvalidasException()
        }
        const passwordValido = await this.passwordHasher.compare(command.data.password, usuario.password)
        if (!passwordValido) throw new CredencialesInvalidasException()

        // Se verifica después del password para no revelar el estado a quien no conoce la contraseña
        if (!usuario.activo) throw new UsuarioInactivoException()

        return { data: await generarSesion(this.tokenService, usuario) }
    }
}
