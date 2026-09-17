import { QueryContract } from "@core/application/contract/query/query.contract";
import { ConsultarPedidosResult } from "../contract/result/consultar-pedidos.result";

export abstract class PedidoReadRepository{
    abstract consultar(query: QueryContract): Promise<ConsultarPedidosResult>;
}