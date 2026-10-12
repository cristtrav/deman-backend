import { QueryContract } from "@core/application/contract/query/query.contract";
import { EntityTypeORMMap } from "@core/infrastructure/typeorm/mapping/entity-typeorm.map";
import { ConsultarPedidosResult } from "@feature/pedido/application/contract/result/consultar-pedidos.result";
import { PedidoReadRepository } from "@feature/pedido/application/read-repository/pedido-read.repository";
import { Pedido } from "@feature/pedido/domain/model/pedido";
import { Between, LessThanOrEqual, Repository } from "typeorm";
import { Temporal } from "@js-temporal/polyfill";
import { QueryPaginationContract } from "@core/application/contract/query/query-pagination.contract";
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

    async contarPendientes(): Promise<number> {
        return this.pedidoRepository.countBy({ entregado: false, eliminado: false });
    }

    async consultarPendientesPorEntrega(
        desde: Temporal.PlainDate | undefined,
        hasta: Temporal.PlainDate,
        pagination: QueryPaginationContract
    ): Promise<ConsultarPedidosResult> {
        const [pedidos, total] = await this.pedidoRepository.findAndCount({
            where: {
                entregado: false,
                eliminado: false,
                fechaEntrega: desde
                    ? Between(desde.toString(), hasta.toString())
                    : LessThanOrEqual(hasta.toString())
            },
            order: { fechaEntrega: 'ASC', id: 'ASC' },
            take: pagination.pageSize,
            skip: (pagination.page - 1) * pagination.pageSize
        });
        return {
            data: pedidos.map(p => PedidoTypeORMMapper.toData(p)),
            page: { page: pagination.page, pageSize: pagination.pageSize, total }
        };
    }
}
