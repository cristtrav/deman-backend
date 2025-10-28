import { QueryContract } from "@core/application/contract/query/query.contract";
import { ResultContract } from "@core/application/contract/result/result.contract";
import { BaseUseCase } from "@core/application/usecase/base.usecase";
import { Cliente } from "../../domain/model/cliente";
import { ClienteReadRepository } from "../read/repository/cliente.read-repository";

export class ConsultarClientesUseCase extends BaseUseCase<QueryContract, ResultContract<Cliente[]>> {
    constructor(private clienteReadRepository: ClienteReadRepository) { super() }
    async execute(query: QueryContract): Promise<ResultContract<Cliente[]>> {
        return await this.clienteReadRepository.findMany(query)
    }
}