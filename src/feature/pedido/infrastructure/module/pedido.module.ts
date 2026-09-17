import { TypeOrmModule } from "@nestjs/typeorm";
import { ClienteTypeORMModel } from "../typeorm/model/cliente.typeorm.model";
import { PedidoTypeORMModel } from "../typeorm/model/pedido.typeorm.model";
import { Module } from "@nestjs/common";
import repositoryConfig from "./repository.config";
import usecaseConfig from "./usecase.config";
import readRepositoryConfig from "./read-repository.config";
import { PedidoController } from "@feature/pedido/presentation/controller/pedido.controller";


@Module({
    imports: [
        TypeOrmModule.forFeature([
            PedidoTypeORMModel,
            ClienteTypeORMModel
        ])
    ],
    providers: [
        ...repositoryConfig,
        ...readRepositoryConfig,
        ...usecaseConfig,
    ],
    controllers: [
        PedidoController
    ]
})
export class PedidoModule {}