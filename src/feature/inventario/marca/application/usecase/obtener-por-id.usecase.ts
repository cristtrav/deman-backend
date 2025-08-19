import { NotFoundException } from "@core/application/exception/not-found.exception"
import { Marca } from "../../domain/model/marca.entity";
import { MarcaRepository } from "../../domain/repository/marca.repository";

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