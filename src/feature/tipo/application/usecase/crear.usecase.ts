import { TipoAlreadyExistsException } from "@feature/tipo/domain/exception/tipo-already-exists.exception"
import { NewTipo } from "@feature/tipo/domain/model/new-tipo.entity"
import { Tipo } from "@feature/tipo/domain/model/tipo.entity"
import { TipoRepository } from "@feature/tipo/domain/repository/tipo.repository"

export class CrearTipoUseCase {
    constructor(
        private readonly tipoRepository: TipoRepository
    ) { }

    async execute(descripcion: string): Promise<Tipo> {
        const normalizedDescription = descripcion.trim().toLowerCase()
        const existingTipo = await this.tipoRepository.findByName(normalizedDescription)
        if (existingTipo) throw new TipoAlreadyExistsException(descripcion)
        const newTipo = new NewTipo(descripcion.trim())
        return this.tipoRepository.create(newTipo)
    }
}