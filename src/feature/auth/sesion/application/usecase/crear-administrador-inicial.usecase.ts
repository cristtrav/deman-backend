import { ResultContract } from "@core/application/contract/result/result.contract";
import { BaseUseCase } from "@core/application/usecase/base.usecase";
import { TransactionManager } from "@core/application/transaction/transaction-manager";
import { NewUsuario } from "@feature/auth/usuario/domain/model/new-usuario.entity";
import { Usuario } from "@feature/auth/usuario/domain/model/usuario.entity";
import { AdministradorInicialRepository } from "../repository/administrador-inicial.repository";
import { AdministradorInicialProvider } from "../port/administrador-inicial.provider";
import { PasswordHasher } from "../port/password-hasher";
import { normalizarCi } from "@feature/auth/usuario/domain/util/normalizar-ci";

export type AdministradorInicialResultado =
    // Ya existía un administrador activo: no se hizo nada
    | { estado: 'existente' }
    // No existía ningún usuario
    | { estado: 'creado', usuario: Usuario }
    // Existían usuarios pero ningún administrador: se otorgó el permiso al usuario de la configuración
    | { estado: 'promovido', usuario: Usuario }
    // Existen usuarios pero ningún administrador, y la configuración no indica un usuario existente
    | { estado: 'sin-administrador' }

interface CrearAdministradorInicialResult extends ResultContract<AdministradorInicialResultado> { }

/**
 * Garantiza que exista un usuario administrador. Si no existe ningún usuario, lo crea;
 * si existen usuarios pero ningún administrador (por ejemplo, al actualizar una instalación
 * anterior al permiso), se lo otorga al usuario de la configuración.
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
            if (await this.administradorInicialRepository.existeAdministrador()) return { data: { estado: 'existente' } }

            if (await this.administradorInicialRepository.existeUsuario()) {
                const ci = this.administradorInicialProvider.obtenerCi()
                const usuario = ci == null ? undefined : await this.administradorInicialRepository.otorgarAdministrador(normalizarCi(ci))
                return { data: usuario == null ? { estado: 'sin-administrador' } : { estado: 'promovido', usuario } }
            }

            const datos = this.administradorInicialProvider.obtener()
            const usuario = await this.administradorInicialRepository.crear(new NewUsuario(
                datos.nombres.trim(),
                datos.apellidos.trim(),
                normalizarCi(datos.ci),
                await this.passwordHasher.hash(datos.password),
                true,
                true
            ))
            return { data: { estado: 'creado', usuario } }
        })
    }
}
