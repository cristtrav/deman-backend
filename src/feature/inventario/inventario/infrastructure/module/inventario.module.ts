import { Module } from '@nestjs/common';
import usecaseConfig from './usecase.config';
import repositoryConfig from './repository.config';
import readRepositoryConfig from './read-repository.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductoTypeORMModel } from '../typeorm/model/producto.typeorm.model';
import { VarianteTypeORMModel } from '../typeorm/model/variante.typeorm.model';
import { StockTypeORMModel } from '../typeorm/model/stock.typeorm.model';
import { InventarioTypeORMModel } from '../typeorm/model/inventario.typeorm.model';
import { DetalleInventarioTypeORMModel } from '../typeorm/model/detalle-inventario.typeorm.model';
import { InventarioController } from '../../presentation/controller/inventario.controller';
import { ColorTypeORMModel } from '../typeorm/model/color.typeorm.model';
import { TamanioTypeORMModel } from '../typeorm/model/tamanio.typeorm.model';
import { UnidadMedidaTypeORMModel } from '../typeorm/model/unidad-medida.typeorm.model';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            ProductoTypeORMModel,
            VarianteTypeORMModel,
            StockTypeORMModel,
            InventarioTypeORMModel,
            DetalleInventarioTypeORMModel,
            ColorTypeORMModel,
            TamanioTypeORMModel,
            UnidadMedidaTypeORMModel
        ])
    ],
    providers: [
        ...repositoryConfig,
        ...readRepositoryConfig,
        ...usecaseConfig
    ],
    controllers: [
        InventarioController
    ]
})
export class InventarioModule {}
