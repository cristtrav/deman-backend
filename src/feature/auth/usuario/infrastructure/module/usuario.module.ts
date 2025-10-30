import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsuarioTypeORMModel } from "../typeorm/model/usuario.typeorm.model";
import repositoryConfig from "./repository.config";
import readRepositoryConfig from "./read-repository.config";
import usecaseConfig from "./usecase.config";
import { UsuarioController } from "../../presentation/controller/usuario.controller";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            UsuarioTypeORMModel,
        ])
    ],
    providers: [
        ...repositoryConfig,
        ...readRepositoryConfig,
        ...usecaseConfig
    ],
    controllers: [
        UsuarioController]
})
export class UsuarioModule { }
