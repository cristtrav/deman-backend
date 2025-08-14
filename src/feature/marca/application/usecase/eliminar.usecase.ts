import { NotFoundException } from "@core/application/exception/not-found.exception"
import { MarcaRepository } from "@feature/marca/domain/repository/marca.repository"

export class EliminarMarcaUseCase {
    constructor(
        private readonly marcaRepository: MarcaRepository
    ) { }
    async execute(id: number): Promise<void> {
        const marca = await this.marcaRepository.obtenerPorId(id)
        if (!marca) throw new NotFoundException("Marca", id)

        await this.marcaRepository.eliminar(id)
    }
}