import { QueryContract } from "@core/application/contract/query/query.contract";
import { EntityTypeORMMap } from "@core/infrastructure/typeorm/mapping/entity-typeorm.map";
import { ConsultarPedidosResult } from "@feature/pedido/application/contract/result/consultar-pedidos.result";
import { PedidoReadRepository } from "@feature/pedido/application/read-repository/pedido-read.repository";
import { Pedido } from "@feature/pedido/domain/model/pedido";
import { Repository } from "typeorm";
import { PedidoTypeORMModel } from "../model/pedido.typeorm.model";
import { InjectRepository } from "@nestjs/typeorm";
import { QueryFindOptionsMapper } from "@core/infrastructure/typeorm/mapper/query-find-options.mapper";
import { PedidoTypeORMMapper } from "../mapper/pedido.typeorm.mapper";

export class PedidoTypeORMReadRepository implements PedidoReadRepository {
    private readonly fieldMapping = new EntityTypeORMMap<Pedido, PedidoTypeORMModel>();

    constructor(
        @InjectRepository(PedidoTypeORMModel)
        private readonly pedidoRepository: Repository<PedidoTypeORMModel>
    ) { 
        this.fieldMapping.set("id", "id");
    }

    async consultar(query: QueryContract): Promise<ConsultarPedidosResult> {
        const options = QueryFindOptionsMapper.toFindOptions<Pedido, PedidoTypeORMModel>(query, this.fieldMapping);
        options.where = { ...options.where, eliminado: false };
        const data = (await this.pedidoRepository.find(options)).map(p => PedidoTypeORMMapper.toData(p));
        const result: ConsultarPedidosResult = { data };
        if(query.pagination) result.page = {
            page: query.pagination.page,
            pageSize: query.pagination.pageSize,
            total: await this.pedidoRepository.count(options)
        }
        return result; 
    }
}   