import { Provider } from "@nestjs/common";
import { CredencialReadRepository } from "../../application/read-repository/credencial.read-repository";
import { PasswordHasher } from "../../application/port/password-hasher";
import { TokenService } from "../../application/port/token.service";
import { IniciarSesionUseCase } from "../../application/usecase/iniciar-sesion.usecase";
import { RefrescarSesionUseCase } from "../../application/usecase/refrescar-sesion.usecase";
import { CrearAdministradorInicialUseCase } from "../../application/usecase/crear-administrador-inicial.usecase";
import { TransactionManager } from "@core/application/transaction/transaction-manager";
import { AdministradorInicialRepository } from "../../application/repository/administrador-inicial.repository";
import { AdministradorInicialProvider } from "../../application/port/administrador-inicial.provider";

export default <Provider[]>[
    {
        provide: IniciarSesionUseCase,
        useFactory: (
            credencialReadRepository: CredencialReadRepository,
            passwordHasher: PasswordHasher,
            tokenService: TokenService
        ) => new IniciarSesionUseCase(
            credencialReadRepository,
            passwordHasher,
            tokenService
        ),
        inject: [
            CredencialReadRepository,
            PasswordHasher,
            TokenService
        ]
    },
    {
        provide: RefrescarSesionUseCase,
        useFactory: (
            credencialReadRepository: CredencialReadRepository,
            tokenService: TokenService
        ) => new RefrescarSesionUseCase(
            credencialReadRepository,
            tokenService
        ),
        inject: [
            CredencialReadRepository,
            TokenService
        ]
    },
    {
        provide: CrearAdministradorInicialUseCase,
        useFactory: (
            transactionManager: TransactionManager,
            administradorInicialRepository: AdministradorInicialRepository,
            administradorInicialProvider: AdministradorInicialProvider,
            passwordHasher: PasswordHasher
        ) => new CrearAdministradorInicialUseCase(
            transactionManager,
            administradorInicialRepository,
            administradorInicialProvider,
            passwordHasher
        ),
        inject: [
            TransactionManager,
            AdministradorInicialRepository,
            AdministradorInicialProvider,
            PasswordHasher
        ]
    }
]
