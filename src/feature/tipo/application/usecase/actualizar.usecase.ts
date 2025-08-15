import { NotFoundException } from "@core/application/exception/not-found.exception"
import { TipoAlreadyExistsException } from "@feature/tipo/domain/exception/tipo-already-exists.exception"
import { Tipo } from "@feature/tipo/domain/model/tipo.entity"
import { TipoRepository } from "@feature/tipo/domain/repository/tipo.repository"

export class ActualizarTipoUseCase {
    constructor(
        private readonly tipoRepository: TipoRepository
    ) { }

    async execute(id: number, descripcion: string): Promise<Tipo> {
        const tipoToUpdate = await this.tipoRepository.getById(id)
        if (!tipoToUpdate) throw new NotFoundException("Tipo", id)

        const normalizedDescription = descripcion.trim().toLowerCase()
        const duplicatedTipo = await this.tipoRepository.findByName(normalizedDescription)

        if (duplicatedTipo && duplicatedTipo.getId() !== id) throw new TipoAlreadyExistsException(descripcion)
        return this.tipoRepository.update(id, descripcion)
    }
}
