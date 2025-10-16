import { ClienteReadRepository } from "@feature/facturacion/cliente/application/read/repository/cliente.read-repository";
import { InjectRepository } from "@nestjs/typeorm";
import { ClienteTypeORMModel } from "../model/cliente.typeorm.model";
import { Repository } from "typeorm";
import { Cliente } from "@feature/facturacion/cliente/domain/model/cliente";
import { ClienteTypeORMMapper } from "../mapper/cliente.typeom.mapper";
import { QueryContract } from "@core/application/contract/query/query.contract";
import { ResultContract } from "@core/application/contract/result/result.contract";
import CLIENTE_FIELD_MAP from "../mapping/cliente.typeorm.mapping";
import { QueryFindOptionsMapper } from "@core/infrastructure/typeorm/mapper/query-find-options.mapper";

export class ClienteReadTypeORMRepository implements ClienteReadRepository {

    constructor(
        @InjectRepository(ClienteTypeORMModel)
        private clienteReadTypeOrmRepository: Repository<ClienteTypeORMModel>
    ) { }

    async findById(id: number): Promise<Cliente | undefined> {
        const clienteReadTypeOrm = await this.clienteReadTypeOrmRepository.findOneBy({ id });
        if (clienteReadTypeOrm == null) return undefined;
        return ClienteTypeORMMapper.toDomain(clienteReadTypeOrm);
    }

    async findMany(query: QueryContract): Promise<ResultContract<Cliente[]>> {
        const options = QueryFindOptionsMapper.toFindOptions(query, CLIENTE_FIELD_MAP);
        options.where = { ...options.where, eliminado: false }
        const clientesRead = await this.clienteReadTypeOrmRepository.find(options);
        const result: ResultContract<Cliente[]> = { data: clientesRead.map(c => ClienteTypeORMMapper.toDomain(c)) }
        if (query.pagination) result.page = {
            page: query.pagination.page,
            pageSize: query.pagination.pageSize,
            total: await this.clienteReadTypeOrmRepository.count(options)
        }
        return result;
    }

}