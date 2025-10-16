import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ClienteTypeORMModel } from "../typeorm/model/cliente.typeorm.model";
import readRepositoryConfig from "./read-repository.config";
import repositoryConfig from "./repository.config";
import usecaseConfig from "./usecase.config";
import { ClienteController } from "../../presentation/controller/cliente.controller";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            ClienteTypeORMModel,
        ])
    ],
    providers: [
        ...repositoryConfig,
        ...readRepositoryConfig,
        ...usecaseConfig
    ],
    controllers: [
        ClienteController
    ]
})
export class ClienteModule {}