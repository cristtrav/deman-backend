import { InjectRepository } from "@nestjs/typeorm";
import { CategoriaTypeORMModel } from "../model/categoria.typeorm.model";
import { FindManyOptions, Repository } from "typeorm";
import { CategoriaReadRepository } from "@feature/inventario/categoria/application/read-repository/categoria.read-repository";
import { CategoriaTypeORMMapper } from "../mapper/categoria.typeorm.mapper";
import { ConsultarCategoriasResult } from "@feature/inventario/categoria/application/contract/result/consultar-categorias.result";
import { QueryContract } from "@core/application/contract/query/query.contract";
import { Categoria } from "@feature/inventario/categoria/domain/model/categoria.entity";
import { CATEGORIA_TYPEORM_MAPPING } from "../mapping/categoria.typeorm.mapping";
import { QueryFindOptionsMapper } from "@core/infrastructure/typeorm/mapper/query-find-options.mapper";

export class CategoriaTypeORMReadRepository implements CategoriaReadRepository{
    
    constructor(
        @InjectRepository(CategoriaTypeORMModel)
        private categoriaTypeOrmRepo: Repository<CategoriaTypeORMModel> 
    ){}

    async findMany(query: QueryContract): Promise<ConsultarCategoriasResult> {
        const options = QueryFindOptionsMapper.toFindOptions<Categoria, CategoriaTypeORMModel>(query, CATEGORIA_TYPEORM_MAPPING);
        const data = (await this.categoriaTypeOrmRepo.find(options)).map(c => CategoriaTypeORMMapper.toDomain(c));
        const result: ConsultarCategoriasResult = { data };
        if(query.pagination) result.page = {
            page: query.pagination.page,
            pageSize: query.pagination.pageSize,
            total: await this.categoriaTypeOrmRepo.count(options)
        }
        return result;
    }

}