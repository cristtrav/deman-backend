import { MarcaAlreadyExistsException } from "../../domain/exception/marca-already-exists.exception";
import { NotFoundException } from "@core/application/exception/not-found.exception";
import { Marca } from "../../domain/model/marca.entity";
import { MarcaRepository } from "../../domain/repository/marca.repository";

export class ActualizarMarcaUseCase {
    constructor(
        private readonly marcaRepository: MarcaRepository
    ) { }

    async execute(id: number, descripcion: string): Promise<Marca> {
        const marcaActual = await this.marcaRepository.findById(id)
        if (!marcaActual) throw new NotFoundException("Marca", id)

        const descripcionNormalizada = descripcion.trim().toLowerCase()
        const marcaDuplicada = await this.marcaRepository.buscarPorNombre(descripcionNormalizada)

        if (marcaDuplicada && marcaDuplicada.id !== id) throw new MarcaAlreadyExistsException(descripcion)
        return this.marcaRepository.edit(id, descripcion)
    }
}
