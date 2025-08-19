import { BaseUseCase } from "@core/application/usecase/base.usecase";
import { CategoriaRepository } from "../../domain/repository/categoria.repository";
import { CrearCategoriaCommand } from "../contract/command/crear-categoria.command";
import { ResultContract } from "@core/application/contract/result/result.contract";
import { Categoria } from "../../domain/model/categoria.entity";
import { NewCategoria } from "../../domain/model/new-categoria.entity";

export class CrearCategoriaUseCase extends BaseUseCase<CrearCategoriaCommand, ResultContract<Categoria>> {
    
    constructor(private categoriaRepository: CategoriaRepository){ super(); }

    async execute(input: CrearCategoriaCommand): Promise<ResultContract<Categoria>> {
        const newCategoria = new NewCategoria(input.data.descripcion, input.data.id);
        const categoria = await this.categoriaRepository.create(newCategoria);
        return { data: categoria }
    }

}