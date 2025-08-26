import { BaseUseCase } from "@core/application/usecase/base.usecase"
import { QueryContract } from "@core/application/contract/query/query.contract"
import { ConsultarColoresResult } from "../contract/result/consultar-color.result"
import { ColorReadRepository } from "../read-repository/color.read-repository"

export class ConsultarColoresUseCase extends BaseUseCase<QueryContract, ConsultarColoresResult> {
    constructor(
        private readonly colorReadRepository: ColorReadRepository
    ) { super() }

    async execute(query: QueryContract): Promise<ConsultarColoresResult> {
        const color = await this.colorReadRepository.consultar(query)
        return color
    }
}