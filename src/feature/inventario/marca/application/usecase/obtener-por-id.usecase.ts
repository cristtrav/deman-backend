import { Marca } from "@feature/marca/domain/model/marca.entity"
import { MarcaRepository } from "@feature/marca/domain/repository/marca.repository"
import { NotFoundException } from "@core/application/exception/not-found.exception"

export class ObtenerMarcaPorIdUseCase {
    constructor(
        private readonly marcaRepository: MarcaRepository
    ) { }

    async execute(id: number): Promise<Marca> {
        const marca = await this.marcaRepository.obtenerPorId(id)
        if (!marca) throw new NotFoundException("Marca", id);
        return marca
    }
}