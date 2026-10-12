import { Logger, OnApplicationBootstrap } from "@nestjs/common";
import { CrearAdministradorInicialUseCase } from "@feature/auth/sesion/application/usecase/crear-administrador-inicial.usecase";

// Al arrancar, crea el usuario administrador a partir del .env si todavía no existe ningún usuario.
// Si no hay usuarios y faltan los datos, el arranque falla: nadie podría iniciar sesión.
export class AdministradorInicialInitializer implements OnApplicationBootstrap {
    private readonly logger = new Logger(AdministradorInicialInitializer.name)

    constructor(
        private crearAdministradorInicialUseCase: CrearAdministradorInicialUseCase
    ) { }

    async onApplicationBootstrap(): Promise<void> {
        const result = await this.crearAdministradorInicialUseCase.execute()
        if (result.data != null) {
            this.logger.log(`Se creó el usuario administrador inicial (CI ${result.data.ci}). Elimine ADMIN_PASSWORD del archivo .env`)
        } else if (process.env.ADMIN_PASSWORD) {
            this.logger.warn('ADMIN_PASSWORD sigue definida en el .env pero ya existen usuarios: se ignora y conviene eliminarla')
        }
    }
}
