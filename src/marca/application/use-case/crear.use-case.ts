import { Marca } from "src/marca/domain/model/marca.entity";
import { MarcaRepository } from "src/marca/domain/repository/marca.repository";
import { MarcaAlreadyExistsException } from "../../domain/exception/marca-already-exists.exception";
import { NewMarca } from "src/marca/domain/model/new-marca.entity";

export class CrearMarcaUseCase {
    constructor(
        private readonly marcaRepository: MarcaRepository
    ) { }

    async execute(descripcion: string): Promise<Marca> {
        const descripcionNormalizada = descripcion.trim().toLowerCase()
        const marcaExistente = await this.marcaRepository.buscarPorNombre(descripcionNormalizada)

        if (marcaExistente) throw new MarcaAlreadyExistsException(descripcion)

        const nuevaMarca = new NewMarca(descripcion.trim())
        return this.marcaRepository.crear(nuevaMarca)
    }
}