import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormConfig from 'src/config/orm-config';
import { DataSource } from 'typeorm';

@Module({
    imports:[
        TypeOrmModule.forRootAsync({ useFactory: () => ormConfig })
    ],
    exports: [TypeOrmModule]
})
export class DatabaseModule {
    constructor(private datasource: DataSource){}
}
