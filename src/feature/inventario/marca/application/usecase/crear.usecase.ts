import { BaseUseCase } from "@core/application/usecase/base.usecase";
import { MarcaAlreadyExistsException } from "../../domain/exception/marca-already-exists.exception";
import { Marca } from "../../domain/model/marca.entity";
import { NewMarca } from "../../domain/model/new-marca.entity";
import { MarcaRepository } from "../../domain/repository/marca.repository";
import { CrearMarcaCommand } from "../../contract/command/crear-marca.command";
import { ResultContract } from "@core/application/contract/result/result.contract";

export class CrearMarcaUseCase extends BaseUseCase<CrearMarcaCommand, ResultContract<Marca>>{
    constructor(
        private readonly marcaRepository: MarcaRepository
    ) { super(); }

    async execute(command: CrearMarcaCommand): Promise<ResultContract<Marca>> {
        const descripcionNormalizada = command.data.descripcion.trim().toLowerCase()
        const marcaExistente = await this.marcaRepository.buscarPorNombre(descripcionNormalizada)

        if (marcaExistente) throw new MarcaAlreadyExistsException(command.data.descripcion)

        const nuevaMarca = new NewMarca(command.data.descripcion)
        return { data: await this.marcaRepository.create(nuevaMarca) }
    }
}