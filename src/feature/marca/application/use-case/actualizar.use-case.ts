import { Marca } from "@feature/marca/domain/model/marca.entity";
import { MarcaRepository } from "@feature/marca/domain/repository/marca.repository";
import { MarcaAlreadyExistsException } from "../../domain/exception/marca-already-exists.exception";
import { MarcaNotFoundException } from "../exception/marca-not-found.exception";


export class ActualizarMarcaUseCase {
    constructor(
        private readonly marcaRepository: MarcaRepository
    ) { }

    async execute(id: number, descripcion: string): Promise<Marca> {
        const marcaActual = await this.marcaRepository.obtenerPorId(id)
        if (!marcaActual) throw new MarcaNotFoundException()

        const descripcionNormalizada = descripcion.trim().toLowerCase()
        const marcaDuplicada = await this.marcaRepository.buscarPorNombre(descripcionNormalizada)

        if (marcaDuplicada && marcaDuplicada.getId() !== id) throw new MarcaAlreadyExistsException(descripcion)
        return this.marcaRepository.actualizar(id, descripcion)
    }
}
