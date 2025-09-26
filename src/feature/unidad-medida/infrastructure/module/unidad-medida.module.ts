import { Module } from '@nestjs/common';
import readRepositoryConfig from './read-repository.config';
import repositoryConfig from './repository.config';
import usecaseConfig from './usecase.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UnidadMedidaTypeORMModel } from '../typeorm/model/unidad-medida.typeorm.model';
import { UnidadMedidaController } from '@feature/unidad-medida/presentation/controller/unidad-medida.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            UnidadMedidaTypeORMModel
        ])
    ],
    providers: [
        ...readRepositoryConfig,
        ...repositoryConfig,
        ...usecaseConfig
    ],
    controllers: [
        UnidadMedidaController
    ]
})
export class UnidadMedidaModule {}
