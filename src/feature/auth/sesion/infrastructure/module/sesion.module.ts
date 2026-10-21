import { Module } from "@nestjs/common";
import { APP_GUARD, Reflector } from "@nestjs/core";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtModule } from "@nestjs/jwt";
import { UsuarioTypeORMModel } from "@feature/auth/usuario/infrastructure/typeorm/model/usuario.typeorm.model";
import readRepositoryConfig from "./read-repository.config";
import repositoryConfig from "./repository.config";
import serviceConfig from "./service.config";
import usecaseConfig from "./usecase.config";
import { AuthController } from "../../presentation/controller/auth.controller";
import { AdministradorInicialInitializer } from "../bootstrap/administrador-inicial.initializer";
import { CrearAdministradorInicialUseCase } from "../../application/usecase/crear-administrador-inicial.usecase";
import { TokenService } from "../../application/port/token.service";
import { AccessTokenGuard } from "../../presentation/guard/access-token.guard";
import { AdministradorGuard } from "../../presentation/guard/administrador.guard";
import { CredencialReadRepository } from "../../application/read-repository/credencial.read-repository";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            UsuarioTypeORMModel
        ]),
        // Sin secreto global: cada token se firma con su propio secreto (access / refresh)
        JwtModule.register({})
    ],
    providers: [
        ...readRepositoryConfig,
        ...repositoryConfig,
        ...serviceConfig,
        ...usecaseConfig,
        {
            provide: AdministradorInicialInitializer,
            useFactory: (useCase: CrearAdministradorInicialUseCase) => new AdministradorInicialInitializer(useCase),
            inject: [CrearAdministradorInicialUseCase]
        },
        {
            // Guard global: protege los endpoints de todos los módulos
            provide: APP_GUARD,
            useFactory: (reflector: Reflector, tokenService: TokenService) => new AccessTokenGuard(reflector, tokenService),
            inject: [Reflector, TokenService]
        },
        {
            // Los guards globales se ejecutan en el orden en que se declaran: este necesita el usuario que adjunta AccessTokenGuard
            provide: APP_GUARD,
            useFactory: (reflector: Reflector, credencialReadRepository: CredencialReadRepository) => new AdministradorGuard(reflector, credencialReadRepository),
            inject: [Reflector, CredencialReadRepository]
        }
    ],
    controllers: [
        AuthController
    ]
})
export class SesionModule { }
