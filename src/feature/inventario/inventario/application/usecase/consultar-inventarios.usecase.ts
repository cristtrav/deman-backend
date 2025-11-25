import { QueryContract } from "@core/application/contract/query/query.contract";
import { ResultContract } from "@core/application/contract/result/result.contract";
import { BaseUseCase } from "@core/application/usecase/base.usecase";
import { Inventario } from "../../domain/model/inventario";
import { InventarioReadRepository } from "../read-repository/inventario.read-repository";

export class ConsultarInventariosUseCase extends BaseUseCase<QueryContract, ResultContract<Inventario[]>>{
    
    constructor(
        private inventarioReadRepository: InventarioReadRepository
    ){ super() }
    
    async execute(query: QueryContract): Promise<ResultContract<Inventario[]>> {
        return this.inventarioReadRepository.findMany(query);
    }

}