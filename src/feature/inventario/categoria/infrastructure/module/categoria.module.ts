import { Module } from '@nestjs/common';
import RepositoryConfig from './repository.config';
import UseCaseConfig from './usecase.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriaTypeORMModel } from '../typeorm/model/categoria.typeorm.model';
import { CategoriaController } from '../../presentation/controller/categoria.controller';
import readRepositoryConfig from './read-repository.config';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            CategoriaTypeORMModel
        ])
    ],
    providers: [
        ...RepositoryConfig,
        ...readRepositoryConfig,
        ...UseCaseConfig
    ],
    controllers: [
        CategoriaController
    ]
})
export class CategoriaModule {}
