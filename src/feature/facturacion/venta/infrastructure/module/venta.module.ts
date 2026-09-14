import { Module } from '@nestjs/common';
import repositoryConfig from './repository.config';
import usecaseConfig from './usecase.config';

@Module({
    providers: [
        ...repositoryConfig,
        ...usecaseConfig
    ]
})
export class VentaModule {}
