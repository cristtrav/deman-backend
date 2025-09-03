import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MarcaTypeORMModel } from '../typeorm/model/marca.typeorm.model';
import { TipoTypeORMModel } from '../typeorm/model/tipo.typeorm.model';
import { CategoriaTypeORMModel } from '../typeorm/model/categoria.typeorm.model';
import { UnidadMedidaTypeORMModel } from '../typeorm/model/unidad-medida.typeorm.model';
import { ProductoTypeORMModel } from '../typeorm/model/producto.typeorm.model';
import { ProductoReadTypeORMModel } from '../typeorm/view/producto-read.typeorm.model';
import readRepositoryConfig from './read-repository.config';
import repositoryConfig from './repository.config';
import usecaseConfig from './usecase.config';
import { ProductoController } from '../../presentation/controller/producto.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            MarcaTypeORMModel,
            TipoTypeORMModel,
            CategoriaTypeORMModel,
            UnidadMedidaTypeORMModel,
            ProductoTypeORMModel,
            ProductoReadTypeORMModel
        ])
    ],
    providers: [
        ...repositoryConfig,
        ...readRepositoryConfig,
        ...usecaseConfig
    ],
    controllers: [
        ProductoController
    ]
})
export class ProductoModule {}
