import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PagoTypeORMModel } from "../typeorm/model/pago.typeorm.model";
import { PedidoTypeORMModel } from "../typeorm/model/pedido.typeorm.model";
import { ClienteTypeORMModel } from "../typeorm/model/cliente.typeorm.model";
import { ReciboTypeORMModel } from "../typeorm/model/recibo.typeorm.model";
import { MovimientoSaldoTypeORMModel } from "../typeorm/model/movimiento-saldo.typeorm.model";
import { NumeracionTypeORMModel } from "../typeorm/model/numeracion.typeorm.model";
import { EmpresaTypeORMModel } from "../typeorm/model/empresa.typeorm.model";
import repositoryConfig from "./repository.config";
import readRepositoryConfig from "./read-repository.config";
import usecaseConfig from "./usecase.config";
import { PagoController } from "@feature/pago/presentation/controller/pago.controller";
import { PedidoPagoController } from "@feature/pago/presentation/controller/pedido-pago.controller";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            PagoTypeORMModel,
            PedidoTypeORMModel,
            ClienteTypeORMModel,
            ReciboTypeORMModel,
            MovimientoSaldoTypeORMModel,
            NumeracionTypeORMModel,
            EmpresaTypeORMModel
        ])
    ],
    providers: [
        ...repositoryConfig,
        ...readRepositoryConfig,
        ...usecaseConfig,
    ],
    controllers: [
        PagoController,
        PedidoPagoController
    ]
})
export class PagoModule {}
