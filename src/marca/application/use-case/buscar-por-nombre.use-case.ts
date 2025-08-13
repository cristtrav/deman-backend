import { Marca } from "src/marca/domain/model/marca.entity"
import { MarcaRepository } from "src/marca/domain/repository/marca.repository"
import { MarcaNotFoundException } from "../exception/marca-not-found.exception"

export class BuscarMarcaPorNombreUseCase {
    constructor(
        private readonly marcaRepository: MarcaRepository
    ) { }

    async execute(descripcion: string): Promise<Marca> {

        const marca = await this.marcaRepository.buscarPorNombre(descripcion)
        if (!marca) throw new MarcaNotFoundException()
        return marca
    }
}