import { MarcaAlreadyExistsException } from "../../domain/exception/marca-already-exists.exception";
import { Marca } from "../../domain/model/marca.entity";
import { NewMarca } from "../../domain/model/new-marca.entity";
import { MarcaRepository } from "../../domain/repository/marca.repository";

export class CrearMarcaUseCase {
    constructor(
        private readonly marcaRepository: MarcaRepository
    ) { }

    async execute(descripcion: string): Promise<Marca> {
        const descripcionNormalizada = descripcion.trim().toLowerCase()
        const marcaExistente = await this.marcaRepository.buscarPorNombre(descripcionNormalizada)

        if (marcaExistente) throw new MarcaAlreadyExistsException(descripcion)

        const nuevaMarca = new NewMarca(descripcion.trim())
        return this.marcaRepository.create(nuevaMarca)
    }
}