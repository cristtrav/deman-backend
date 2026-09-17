import { ResultContract } from "@core/application/contract/result/result.contract";
import { PedidoData } from "../data/pedido.data";

export interface ConsultarPedidosResult extends ResultContract<PedidoData[]> {
}