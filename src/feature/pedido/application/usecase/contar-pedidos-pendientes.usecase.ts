import { BaseUseCase } from "@core/application/usecase/base.usecase";
import { ResultContract } from "@core/application/contract/result/result.contract";
import { PedidoReadRepository } from "../read-repository/pedido-read.repository";

// Pendiente: no entregado ni eliminado, sin importar la fecha de entrega (incluye los atrasados)
export class ContarPedidosPendientesUseCase extends BaseUseCase<void, ResultContract<number>> {

    constructor(
        private readonly pedidoReadRepository: PedidoReadRepository
    ) { super(); }

    async execute(): Promise<ResultContract<number>> {
        return { data: await this.pedidoReadRepository.contarPendientes() };
    }
}
