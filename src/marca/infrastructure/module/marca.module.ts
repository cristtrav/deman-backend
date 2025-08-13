import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MarcaTypeORMModel } from "../typeorm/model/marca.typeorm.model";
import { MarcaController } from "src/marca/presentation/controller/marca.controller";
import RepositoryConfig from "./repository-config"
import UseCaseConfig from "./usecase-config";

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