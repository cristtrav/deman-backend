import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MarcaTypeORMModel } from "../typeorm/model/marca.typeorm.model";
import RepositoryConfig from "./repository-config"
import UseCaseConfig from "./usecase-config";
import { MarcaController } from "../../presentation/controller/marca.controller";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            MarcaTypeORMModel,
        ])
    ],
    providers: [
        ...RepositoryConfig,
        ...UseCaseConfig
    ],
    controllers: [
        MarcaController
    ]
})
export class MarcaModule {}