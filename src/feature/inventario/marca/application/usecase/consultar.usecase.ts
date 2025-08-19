import { BaseUseCase } from "@core/application/usecase/base.usecase";
import { QueryContract } from "@core/application/contract/query/query.contract";
import { MarcaReadRepository } from "../read-repository/marca.read-repository";
import { ConsultarMarcasResult } from "../contract/result/consultar-marcas.result";

export class ConsultarMarcasUseCase extends BaseUseCase<QueryContract, ConsultarMarcasResult> {
    
    constructor(
        private marcaReadRepository: MarcaReadRepository
    ) { super(); }

    async execute(query: QueryContract): Promise<ConsultarMarcasResult> {
        return await this.marcaReadRepository.consultar(query);
    }
}