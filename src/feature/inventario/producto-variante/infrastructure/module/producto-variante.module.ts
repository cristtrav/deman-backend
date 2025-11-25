import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoTypeORMModel } from '../typeorm/model/tipo.typeorm.model';
import { CategoriaTypeORMModel } from '../typeorm/model/categoria.typeorm.model';
import { ColorTypeORMModel } from '../typeorm/model/color.typeorm.model';
import { MarcaTypeORMModel } from '../typeorm/model/marca.typeorm.model';
import { ProductoTypeORMModel } from '../typeorm/model/producto.typeorm.model';
import { TamanioTypeORMModel } from '../typeorm/model/tamanio.typeorm.model';
import { UnidadMedidaTypeORMModel } from '../typeorm/model/unidad-medida.typeorm.model';
import { VarianteTypeORMModel } from '../typeorm/model/variante.typeorm.model';
import readRepositoryConfig from './read-repository.config';
import usecaseConfig from './usecase.config';
import { ProductoVarianteTypeORMModel } from '../typeorm/model/producto-variante.typeorm.model';
import { ProductoVarianteController } from '../../presentation/controller/producto-variante.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            TipoTypeORMModel,
            CategoriaTypeORMModel,
            ColorTypeORMModel,
            MarcaTypeORMModel,
            ProductoTypeORMModel,
            TamanioTypeORMModel,
            TipoTypeORMModel,
            UnidadMedidaTypeORMModel,
            VarianteTypeORMModel,
            ProductoVarianteTypeORMModel
        ])
    ],
    providers: [
        ...readRepositoryConfig,
        ...usecaseConfig
    ],
    controllers: [
        ProductoVarianteController
    ]
})
export class ProductoVarianteModule {}
