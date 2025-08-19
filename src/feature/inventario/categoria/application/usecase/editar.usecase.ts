import { BaseUseCase } from "@core/application/usecase/base.usecase";
import { EditarCategoriaCommand } from "../contract/command/editar-categoria.command";
import { ResultContract } from "@core/application/contract/result/result.contract";
import { Categoria } from "../../domain/model/categoria.entity";
import { CategoriaRepository } from "../../domain/repository/categoria.repository";

export class EditarCategoriaUseCase extends BaseUseCase<EditarCategoriaCommand, ResultContract<Categoria>>{
    
    constructor(
        private readonly categoriaRepository: CategoriaRepository
    ){ super(); }

    async execute(input: EditarCategoriaCommand): Promise<ResultContract<Categoria>> {
        const categoria = new Categoria(input.data.id, input.data.descripcion);
        const savedCateogira = await this.categoriaRepository.edit(categoria);
        return { data: savedCateogira }
    }

}