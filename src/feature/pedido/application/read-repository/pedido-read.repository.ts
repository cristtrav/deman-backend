import { QueryContract } from "@core/application/contract/query/query.contract";
import { QueryPaginationContract } from "@core/application/contract/query/query-pagination.contract";
import { Temporal } from "@js-temporal/polyfill";
import { ConsultarPedidosResult } from "../contract/result/consultar-pedidos.result";

export abstract class PedidoReadRepository{
    abstract consultar(query: QueryContract): Promise<ConsultarPedidosResult>;
    // Pendiente: no entregado ni eliminado
    abstract contarPendientes(): Promise<number>;
    // Pendientes con fecha de entrega en el rango (ambos extremos incluidos), por fecha de entrega ascendente.
    // Sin "desde", incluye todas las fechas hasta "hasta".
    abstract consultarPendientesPorEntrega(
        desde: Temporal.PlainDate | undefined,
        hasta: Temporal.PlainDate,
        pagination: QueryPaginationContract
    ): Promise<ConsultarPedidosResult>;
}
