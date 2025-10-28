import { QueryContract } from "@core/application/contract/query/query.contract";
import { ResultContract } from "@core/application/contract/result/result.contract";
import { InventarioReadRepository } from "@feature/inventario/inventario/application/read-repository/inventario.read-repository";
import { Inventario } from "@feature/inventario/inventario/domain/model/inventario";
import { InjectRepository } from "@nestjs/typeorm";
import { InventarioTypeORMModel } from "../model/inventario.typeorm.model";
import { Repository } from "typeorm";
import { QueryFindOptionsMapper } from "@core/infrastructure/typeorm/mapper/query-find-options.mapper";
import INVENTARIO_FIELD_MAP from "../mapping/inventario.typeorm.mapping";
import { InventarioTypeORMMapper } from "../mapper/inventario.typeorm.mapper";

export class InventarioTypeORMReadRepository implements InventarioReadRepository {

    constructor(
        @InjectRepository(InventarioTypeORMModel)
        private inventarioTypeOrmRepo: Repository<InventarioTypeORMModel>
    ){}

    async findMany(query: QueryContract): Promise<ResultContract<Inventario[]>> {
        const options = QueryFindOptionsMapper.toFindOptions<Inventario, InventarioTypeORMModel>(query, INVENTARIO_FIELD_MAP);
        options.where = { ...options.where, eliminado: false };
        const data = (await this.inventarioTypeOrmRepo.find(options)).map(
            inventarioOrm => InventarioTypeORMMapper.toDomain(inventarioOrm)
        );
        const result: ResultContract<Inventario[]> = { data }
        if(query.pagination) result.page = {
            page: query.pagination.page,
            pageSize: query.pagination.pageSize,
            total: await this.inventarioTypeOrmRepo.count(options)
        }
        return result;
    }

}