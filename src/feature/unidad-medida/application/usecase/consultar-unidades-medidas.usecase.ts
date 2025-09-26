import { QueryContract } from "@core/application/contract/query/query.contract";
import { ResultContract } from "@core/application/contract/result/result.contract";
import { BaseUseCase } from "@core/application/usecase/base.usecase";
import { UnidadMedida } from "@feature/unidad-medida/domain/model/unidad-medida";
import { UnidadMedidaReadRepository } from "../repository/unidad-medida.read-repository";

export class ConsultarUnidadesMedidasUseCase extends BaseUseCase<QueryContract, ResultContract<UnidadMedida[]>>{
    
    constructor(
        private unidadMedidaReadRepo: UnidadMedidaReadRepository
    ){ super() }

    async execute(query: QueryContract): Promise<ResultContract<UnidadMedida[]>> {
        return this.unidadMedidaReadRepo.findMany(query);
    }

}