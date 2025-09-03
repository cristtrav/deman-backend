import { QueryContract } from "@core/application/contract/query/query.contract";
import { ResultContract } from "@core/application/contract/result/result.contract";
import { BaseUseCase } from "@core/application/usecase/base.usecase";
import { ProductoReadRepository } from "../read/repository/producto.read-repository";
import { Producto } from "../../domain/model/producto";

export class ConsultarProductosUseCase extends BaseUseCase<QueryContract, ResultContract<Producto[]>>{
    
    constructor(private productoReadRepository: ProductoReadRepository){ super() }

    async execute(query: QueryContract): Promise<ResultContract<Producto[]>> {
        return await this.productoReadRepository.findMany(query);
    }

}