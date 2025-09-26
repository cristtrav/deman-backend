import { QueryContract } from "@core/application/contract/query/query.contract";
import { ResultContract } from "@core/application/contract/result/result.contract";
import { UnidadMedidaReadRepository } from "@feature/unidad-medida/application/repository/unidad-medida.read-repository";
import { UnidadMedida } from "@feature/unidad-medida/domain/model/unidad-medida";
import { InjectRepository } from "@nestjs/typeorm";
import { UnidadMedidaTypeORMModel } from "../model/unidad-medida.typeorm.model";
import { Repository } from "typeorm";
import { QueryFindOptionsMapper } from "@core/infrastructure/typeorm/mapper/query-find-options.mapper";
import UNIDAD_MEDIDA_FIELD_MAP from "../mapping/unidad-medida.typeorm.mapping";
import { UnidadMedidaTypeORMMapper } from "../mapper/unidad-medida.typeorm.mapper";

export class UnidadMedidaTypeORMReadRepository implements UnidadMedidaReadRepository{

    constructor(
        @InjectRepository(UnidadMedidaTypeORMModel)
        private unidadMedidaTypeOrmRepo: Repository<UnidadMedidaTypeORMModel>
    ){ }

    async findMany(query: QueryContract): Promise<ResultContract<UnidadMedida[]>> {
        const options = QueryFindOptionsMapper.toFindOptions<UnidadMedida, UnidadMedidaTypeORMModel>(query, UNIDAD_MEDIDA_FIELD_MAP);
        const data = (await this.unidadMedidaTypeOrmRepo.find(options)).map(umOrm => UnidadMedidaTypeORMMapper.toDomain(umOrm));
        const result: ResultContract<UnidadMedida[]> = { data };
        if(query.pagination) result.page = {
            page: query.pagination.page,
            pageSize: query.pagination.pageSize,
            total: await this.unidadMedidaTypeOrmRepo.count(options)
        }
        return result;
    }
}