import { QueryContract } from "@core/application/contract/query/query.contract"
import { BaseUseCase } from "@core/application/usecase/base.usecase"
import { ConsultarTiposResult } from "../contract/result/consultar-tipos.result"
import { TipoReadRepository } from "../repository/tipo.read-repository"

export class ConsultarTiposUseCase extends BaseUseCase<QueryContract, ConsultarTiposResult> {
    constructor(
        private readonly tipoReadRepository: TipoReadRepository
    ) { super() }

    async execute(query: QueryContract): Promise<ConsultarTiposResult> {
        const tipo = await this.tipoReadRepository.consultar(query)
        return tipo
    }
}