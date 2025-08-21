import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ColorTypeORMModel } from "../typeorm/model/color.typeorm.model";
import { ColorController } from "@feature/inventario/color/presentation/controller/color.controller";
import RepositoryConfig from "./repository-config"
import UseCaseConfig from "./usecase-config";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            ColorTypeORMModel,
        ])
    ],
    providers: [
        ...RepositoryConfig,
        ...UseCaseConfig
    ],
    controllers: [
        ColorController
    ]
})
export class ColorModule {}