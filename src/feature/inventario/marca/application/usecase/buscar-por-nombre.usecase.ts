import { Marca } from "../../domain/model/marca.entity"
import { MarcaRepository } from "../../domain/repository/marca.repository"
import { MarcaNotFoundException } from "../exception/marca-not-found.exception"

export class BuscarMarcaPorNombreUseCase {
    constructor(
        private readonly marcaRepository: MarcaRepository
    ) { }

    async execute(descripcion: string): Promise<Marca> {

        const marca = await this.marcaRepository.buscarPorNombre(descripcion)
        if (!marca) throw new MarcaNotFoundException(descripcion)
        return marca
    }
}