import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TipoTypeORMModel } from "../typeorm/model/tipo.typeorm.model";
import RepositoryConfig from "./repository.config"
import UseCaseConfig from "./usecase.config";
import { TipoController } from "../../presentation/controller/tipo.controller";
import readRepositoryConfig from './read-repository.config';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            TipoTypeORMModel,
        ])
    ],
    providers: [
        ...RepositoryConfig,
        ...readRepositoryConfig,
        ...UseCaseConfig
    ],
    controllers: [
        TipoController
    ]
})
export class TipoModule { }