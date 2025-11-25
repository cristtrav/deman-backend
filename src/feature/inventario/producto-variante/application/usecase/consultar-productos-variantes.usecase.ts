import { QueryContract } from "@core/application/contract/query/query.contract";
import { ResultContract } from "@core/application/contract/result/result.contract";
import { BaseUseCase } from "@core/application/usecase/base.usecase";
import { ProductoVariante } from "../../domain/model/produdcto-variante";
import { ProductoVarianteReadRepository } from "../read-repository/producto-variante.read-repository";

export class ConsultarProductosVariantes extends BaseUseCase<QueryContract, ResultContract<ProductoVariante[]>>{
    
    constructor(
        private productoVarianteReadRepo: ProductoVarianteReadRepository
    ){ super() }

    async execute(query: QueryContract): Promise<ResultContract<ProductoVariante[]>> {
        return this.productoVarianteReadRepo.findMany(query);
    }

}