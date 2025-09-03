import { TipoReadRepository } from "@feature/inventario/tipo/application/repository/tipo.read-repository";
import { InjectRepository } from "@nestjs/typeorm";
import { TipoTypeORMModel } from "../model/tipo.typeorm.model";
import { Repository } from "typeorm";
import { QueryContract } from "@core/application/contract/query/query.contract";
import { ConsultarTiposResult } from "@feature/inventario/tipo/application/contract/result/consultar-tipos.result";
import { QueryFindOptionsMapper } from "@core/infrastructure/typeorm/mapper/query-find-options.mapper";
import { Tipo } from "@feature/inventario/tipo/domain/model/tipo.entity";
import { TIPO_TYPEORM_MAPPING } from "../mapping/tipo.typeorm.mapping";
import { TipoTypeORMMapper } from "../mapper/tipo.typeorm.mapper";

export class TipoTypeORMReadRepository implements TipoReadRepository {
    constructor(
        @InjectRepository(TipoTypeORMModel)
        private tipoTypeORMRepo: Repository<TipoTypeORMModel>
    ) { }
    async consultar(query: QueryContract): Promise<ConsultarTiposResult> {
        const options = QueryFindOptionsMapper.toFindOptions<Tipo, TipoTypeORMModel>(query, TIPO_TYPEORM_MAPPING);
        const data = (await this.tipoTypeORMRepo.find(options)).map(t => TipoTypeORMMapper.toDomain(t))
        const result: ConsultarTiposResult = { data }
        if (query.pagination) result.page = {
            page: query.pagination.page,
            pageSize: query.pagination.page,
            total: await this.tipoTypeORMRepo.count(options)
        }
        return result
    }

}