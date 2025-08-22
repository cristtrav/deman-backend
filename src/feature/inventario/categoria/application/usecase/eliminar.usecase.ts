import { BaseUseCase } from "@core/application/usecase/base.usecase";
import { EliminarCategoriaCommand } from "../contract/command/eliminar-categoria.command";
import { CategoriaRepository } from "../../domain/repository/categoria.repository";

export class EliminarCategoriaUseCase implements BaseUseCase<EliminarCategoriaCommand, void>{
    
    constructor(
        private readonly categoriaRepository: CategoriaRepository
    ){ }
    
    async execute(input: EliminarCategoriaCommand): Promise<void> {
        await this.categoriaRepository.delete(input.data.id);
    }

}