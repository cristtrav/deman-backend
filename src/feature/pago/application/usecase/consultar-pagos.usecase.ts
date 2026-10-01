import { QueryContract } from "@core/application/contract/query/query.contract";
import { BaseUseCase } from "@core/application/usecase/base.usecase";
import { ConsultarPagosResult } from "../contract/result/consultar-pagos.result";
import { PagoReadRepository } from "../read-repository/pago-read.repository";

export class ConsultarPagosUseCase extends BaseUseCase<QueryContract, ConsultarPagosResult> {

    constructor(
        private readonly pagoReadRepository: PagoReadRepository
    ) { super(); }

    async execute(query: QueryContract): Promise<ConsultarPagosResult> {
        return await this.pagoReadRepository.consultar(query);
    }
}
