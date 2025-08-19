import { QueryContract } from "@core/application/contract/query/query.contract";
import { MarcaReadRepository } from "@feature/inventario/marca/application/read-repository/marca.read-repository";
import { Repository } from "typeorm";
import { MarcaTypeORMModel } from "../model/marca.typeorm.model";
import { InjectRepository } from "@nestjs/typeorm";
import { ConsultarMarcasResult } from "@feature/inventario/marca/contract/result/consultar-marcas.result";
import { QueryFindManyOptionsMapper } from "@core/infrastructure/mapper/query-find-many-options.mapper";
import { MARCA_TYPEORM_MAPPING } from "../mapping/marca.typeorm.mapping";
import { Marca } from "@feature/inventario/marca/domain/model/marca.entity";
import { MarcaTypeORMMapper } from "../mapper/marca.typeorm.mapper";

export class MarcaTypeORMReadRepository implements MarcaReadRepository{

    constructor(
        @InjectRepository(MarcaTypeORMModel)
        private readonly marcaTypeOrmRepository: Repository<MarcaTypeORMModel>
    ){}

    async consultar(query: QueryContract): Promise<ConsultarMarcasResult> {
        const options = QueryFindManyOptionsMapper.toFindOptions<Marca, MarcaTypeORMModel>(query, MARCA_TYPEORM_MAPPING);
        const data = (await this.marcaTypeOrmRepository.find(options)).map(m => MarcaTypeORMMapper.toDomain(m));
        const result: ConsultarMarcasResult = { data }
        if(query.pagination) result.page = {
            page: query.pagination.page,
            pageSize: query.pagination.pageSize,
            total: await this.marcaTypeOrmRepository.count(options)
        }
        return result;
    }

}