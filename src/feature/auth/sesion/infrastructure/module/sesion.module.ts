import { Module } from "@nestjs/common";
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
        }
    ],
    controllers: [
        AuthController
    ]
})
export class SesionModule { }
