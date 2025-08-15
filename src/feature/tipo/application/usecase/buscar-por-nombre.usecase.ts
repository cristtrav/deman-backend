import { Tipo } from "@feature/tipo/domain/model/tipo.entity"
import { TipoRepository } from "@feature/tipo/domain/repository/tipo.repository"
import { TipoNotFoundException } from "../exception/tipo-not-found.exception"

export class BuscarTipoPorNombreUseCase {
    constructor(
        private readonly tipoRepository: TipoRepository
    ) { }

    async execute(descripcion: string): Promise<Tipo> {
        const tipo = await this.tipoRepository.findByName(descripcion)
        if (!tipo) throw new TipoNotFoundException(descripcion)
        return tipo
    }
}