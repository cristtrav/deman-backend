import { QueryContract } from "@core/application/contract/query/query.contract";
import { ConsultarPagosResult } from "../contract/result/consultar-pagos.result";

export abstract class PagoReadRepository {
    abstract consultar(query: QueryContract): Promise<ConsultarPagosResult>;
    abstract consultarPorPedido(pedidoId: number): Promise<ConsultarPagosResult>;
}
