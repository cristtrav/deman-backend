import { MarcaRepository } from "@feature/marca/domain/repository/marca.repository"
import { MarcaNotFoundException } from "../exception/marca-not-found.exception"

export class EliminarMarcaUseCase {
    constructor(
        private readonly marcaRepository: MarcaRepository
    ) { }
    async execute(id: number): Promise<void> {
        const marca = await this.marcaRepository.obtenerPorId(id)
        if (!marca) throw new MarcaNotFoundException()

        await this.marcaRepository.eliminar(id)
    }
}