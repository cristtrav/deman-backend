import { BaseUseCase } from "@core/application/usecase/base.usecase";
import { QueryPaginationContract } from "@core/application/contract/query/query-pagination.contract";
import { Temporal } from "@js-temporal/polyfill";
import { PedidoReadRepository } from "../read-repository/pedido-read.repository";
import { ConsultarPedidosResult } from "../contract/result/consultar-pedidos.result";
import { PeriodoEntrega } from "../contract/data/periodo-entrega";

export interface ConsultarProximasEntregasQuery {
    periodo: PeriodoEntrega;
    pagination: QueryPaginationContract;
}

/**
 * Pedidos pendientes cuya entrega cae en el periodo, de la más próxima a la más lejana.
 * - hoy: la fecha actual.
 * - semana: de mañana a dentro de 6 días; junto con "hoy" cubre los próximos 7 días sin repetir pedidos.
 * - atrasados: hasta ayer; primero los más atrasados.
 */
export class ConsultarProximasEntregasUseCase extends BaseUseCase<ConsultarProximasEntregasQuery, ConsultarPedidosResult> {

    constructor(
        private readonly pedidoReadRepository: PedidoReadRepository,
        // Inyectable para las pruebas
        private readonly hoy: () => Temporal.PlainDate = () => Temporal.Now.plainDateISO()
    ) { super(); }

    async execute(query: ConsultarProximasEntregasQuery): Promise<ConsultarPedidosResult> {
        const hoy = this.hoy();
        const [desde, hasta] = this.rango(query.periodo, hoy);
        return this.pedidoReadRepository.consultarPendientesPorEntrega(desde, hasta, query.pagination);
    }

    private rango(periodo: PeriodoEntrega, hoy: Temporal.PlainDate): [Temporal.PlainDate | undefined, Temporal.PlainDate] {
        switch (periodo) {
            case 'hoy': return [hoy, hoy];
            case 'semana': return [hoy.add({ days: 1 }), hoy.add({ days: 6 })];
            case 'atrasados': return [undefined, hoy.subtract({ days: 1 })];
        }
    }
}
