import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EmpresaTypeORMModel } from "../typeorm/model/empresa.typeorm.model";
import { ReciboEmpresaTypeORMModel } from "../typeorm/model/recibo-empresa.typeorm.model";
import repositoryConfig from "./repository.config";
import usecaseConfig from "./usecase.config";
import { EmpresaController } from "@feature/empresa/presentation/controller/empresa.controller";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            EmpresaTypeORMModel,
            ReciboEmpresaTypeORMModel
        ])
    ],
    providers: [
        ...repositoryConfig,
        ...usecaseConfig
    ],
    controllers: [
        EmpresaController
    ]
})
export class EmpresaModule {}
