import { Marca } from "src/marca/domain/model/marca.entity"
import { MarcaRepository } from "src/marca/domain/repository/marca.repository"
import { MarcaNotFoundException } from "../exception/marca-not-found.exception"

export class ObtenerMarcaPorIdUseCase {
    constructor(
        private readonly marcaRepository: MarcaRepository
    ) { }

    async execute(id: number): Promise<Marca> {

        const marca = await this.marcaRepository.obtenerPorId(id)
        if (!marca) throw new MarcaNotFoundException()
        return marca
    }
}