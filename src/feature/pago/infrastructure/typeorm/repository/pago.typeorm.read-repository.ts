import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { QueryContract } from "@core/application/contract/query/query.contract";
import { EntityTypeORMMap } from "@core/infrastructure/typeorm/mapping/entity-typeorm.map";
import { QueryFindOptionsMapper } from "@core/infrastructure/typeorm/mapper/query-find-options.mapper";
import { ConsultarPagosResult } from "@feature/pago/application/contract/result/consultar-pagos.result";
import { PagoData } from "@feature/pago/application/contract/data/pago.data";
import { PagoReadRepository } from "@feature/pago/application/read-repository/pago-read.repository";
import { Pago } from "@feature/pago/domain/model/pago";
import { PagoTypeORMModel } from "../model/pago.typeorm.model";
import { ReciboTypeORMModel } from "../model/recibo.typeorm.model";
import { PagoTypeORMMapper } from "../mapper/pago.typeorm.mapper";

export class PagoTypeORMReadRepository implements PagoReadRepository {
    private readonly fieldMapping = new EntityTypeORMMap<Pago, PagoTypeORMModel>();

    constructor(
        @InjectRepository(PagoTypeORMModel)
        private readonly pagoRepository: Repository<PagoTypeORMModel>,
        @InjectRepository(ReciboTypeORMModel)
        private readonly reciboRepository: Repository<ReciboTypeORMModel>
    ) {
        this.fieldMapping.set("id", "id");
        this.fieldMapping.set("pedido.id", "pedido.id");
        this.fieldMapping.set("monto", "monto");
    }

    async consultar(query: QueryContract): Promise<ConsultarPagosResult> {
        const options = QueryFindOptionsMapper.toFindOptions<Pago, PagoTypeORMModel>(query, this.fieldMapping);
        options.where = { ...options.where, eliminado: false };
        const data = await this.toData(await this.pagoRepository.find(options));
        const result: ConsultarPagosResult = { data };
        if(query.pagination) result.page = {
            page: query.pagination.page,
            pageSize: query.pagination.pageSize,
            total: await this.pagoRepository.count(options)
        }
        return result;
    }

    async consultarPorPedido(pedidoId: number): Promise<ConsultarPagosResult> {
        const pagos = await this.pagoRepository.find({
            where: { pedido: { id: pedidoId }, eliminado: false },
            order: { fecha: 'ASC', id: 'ASC' }
        });
        return { data: await this.toData(pagos) };
    }

    private async toData(pagos: PagoTypeORMModel[]): Promise<PagoData[]> {
        if(pagos.length == 0) return [];
        const recibos = await this.reciboRepository.find({
            select: { pagoId: true, numero: true },
            where: { pagoId: In(pagos.map(p => p.id)) }
        });
        const numeroPorPago = new Map(recibos.map(r => [r.pagoId, r.numero]));
        return pagos.map(p => PagoTypeORMMapper.toData(p, numeroPorPago.get(p.id)));
    }
}
