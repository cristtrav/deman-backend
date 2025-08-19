import { BaseUseCase } from "@core/application/usecase/base.usecase";
import { CategoriaReadRepository } from "../read-repository/categoria.read-repository";
import { ConsultarCategoriasResult } from "../contract/result/consultar-categorias.result";
import { QueryContract } from "@core/application/contract/query/query.contract";

export class ConsultarCategoriasUseCase extends BaseUseCase<QueryContract, ConsultarCategoriasResult> {

    constructor(
        private readonly categoriaReadRepository: CategoriaReadRepository
    ){
        super();
    }

    async execute(query: QueryContract): Promise<ConsultarCategoriasResult> {
        return this.categoriaReadRepository.findMany(query);
    }

    
}