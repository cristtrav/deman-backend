import { Logger, OnApplicationBootstrap } from "@nestjs/common";
import { CrearAdministradorInicialUseCase } from "@feature/auth/sesion/application/usecase/crear-administrador-inicial.usecase";

// Al arrancar, crea el usuario administrador a partir del .env si todavía no existe ningún usuario,
// o le otorga el permiso al usuario de ADMIN_CI si existen usuarios pero ningún administrador.
// Si no hay usuarios y faltan los datos, el arranque falla: nadie podría iniciar sesión.
export class AdministradorInicialInitializer implements OnApplicationBootstrap {
    private readonly logger = new Logger(AdministradorInicialInitializer.name)

    constructor(
        private crearAdministradorInicialUseCase: CrearAdministradorInicialUseCase
    ) { }

    async onApplicationBootstrap(): Promise<void> {
        const result = (await this.crearAdministradorInicialUseCase.execute()).data
        if (result.estado == 'creado') {
            this.logger.log(`Se creó el usuario administrador inicial (CI ${result.usuario.ci}). Elimine ADMIN_PASSWORD del archivo .env`)
            return
        }
        if (result.estado == 'promovido') {
            this.logger.log(`No existía ningún administrador: se otorgó el permiso al usuario con CI ${result.usuario.ci} (ADMIN_CI)`)
        } else if (result.estado == 'sin-administrador') {
            // No se detiene el arranque: los usuarios pueden seguir trabajando, solo no se pueden administrar usuarios
            this.logger.warn('No existe ningún usuario administrador activo: defina en ADMIN_CI el CI de un usuario existente y reinicie para otorgarle el permiso')
        }
        if (process.env.ADMIN_PASSWORD) {
            this.logger.warn('ADMIN_PASSWORD sigue definida en el .env pero ya existen usuarios: se ignora y conviene eliminarla')
        }
    }
}
