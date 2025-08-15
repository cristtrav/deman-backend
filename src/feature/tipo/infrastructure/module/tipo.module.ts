import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TipoTypeORMModel } from "../typeorm/model/tipo.typeorm.model";
import { TipoController } from "@feature/tipo/presentation/controller/tipo.controller";
import RepositoryConfig from "./repository-config"
import UseCaseConfig from "./usecase-config";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            TipoTypeORMModel,
        ])
    ],
    providers: [
        ...RepositoryConfig,
        ...UseCaseConfig
    ],
    controllers: [
        TipoController
    ]
})
export class TipoModule {}