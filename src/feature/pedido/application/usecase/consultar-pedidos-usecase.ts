import { QueryContract } from "@core/application/contract/query/query.contract";
import { BaseUseCase } from "@core/application/usecase/base.usecase";
import { ConsultarPedidosResult } from "../contract/result/consultar-pedidos.result";
import { PedidoReadRepository } from "../read-repository/pedido-read.repository";

export class ConsultarPedidosUseCase extends BaseUseCase<QueryContract, ConsultarPedidosResult> {
    
    constructor(
        private pedidoReadRepository: PedidoReadRepository
    ) { super(); }

    async execute(query: QueryContract): Promise<ConsultarPedidosResult> {
        return await this.pedidoReadRepository.consultar(query);
    }
}