import { NotFoundException } from "@core/application/exception/not-found.exception"
import { TipoRepository } from "@feature/tipo/domain/repository/tipo.repository"

export class EliminarTipoUseCase {
    constructor(
        private readonly tipoRepository: TipoRepository
    ) { }
    async execute(id: number): Promise<void> {
        const tipo = await this.tipoRepository.getById(id)
        if (!tipo) throw new NotFoundException("Tipo", id)

        await this.tipoRepository.delete(id)
    }
}