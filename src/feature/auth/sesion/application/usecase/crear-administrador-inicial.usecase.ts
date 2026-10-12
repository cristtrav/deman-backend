import { ResultContract } from "@core/application/contract/result/result.contract";
import { BaseUseCase } from "@core/application/usecase/base.usecase";
import { TransactionManager } from "@core/application/transaction/transaction-manager";
import { NewUsuario } from "@feature/auth/usuario/domain/model/new-usuario.entity";
import { Usuario } from "@feature/auth/usuario/domain/model/usuario.entity";
import { AdministradorInicialRepository } from "../repository/administrador-inicial.repository";
import { AdministradorInicialProvider } from "../port/administrador-inicial.provider";
import { PasswordHasher } from "../port/password-hasher";
import { normalizarCi } from "@feature/auth/usuario/domain/util/normalizar-ci";

// undefined cuando ya existían usuarios y no se creó ninguno
interface CrearAdministradorInicialResult extends ResultContract<Usuario | undefined> { }

/**
 * Crea el primer usuario del sistema si todavía no existe ninguno.
 * Los datos solo se solicitan cuando hacen falta, de modo que pueden eliminarse
 * de la configuración una vez creado el usuario.
 */
export class CrearAdministradorInicialUseCase extends BaseUseCase<void, CrearAdministradorInicialResult> {
    constructor(
        private transactionManager: TransactionManager,
        private administradorInicialRepository: AdministradorInicialRepository,
        private administradorInicialProvider: AdministradorInicialProvider,
        private passwordHasher: PasswordHasher
    ) { super() }

    async execute(): Promise<CrearAdministradorInicialResult> {
        return this.transactionManager.run(async () => {
            // Con el bloqueo, un segundo intento simultáneo espera y luego encuentra el usuario ya creado
            await this.administradorInicialRepository.bloquearUsuarios()
            if (await this.administradorInicialRepository.existeUsuario()) return { data: undefined }

            const datos = this.administradorInicialProvider.obtener()
            const usuario = await this.administradorInicialRepository.crear(new NewUsuario(
                datos.nombres.trim(),
                datos.apellidos.trim(),
                normalizarCi(datos.ci),
                await this.passwordHasher.hash(datos.password),
                true
            ))
            return { data: usuario }
        })
    }
}
