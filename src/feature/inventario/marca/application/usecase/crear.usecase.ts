import { BaseUseCase } from "@core/application/usecase/base.usecase";
import { Marca } from "../../domain/model/marca.entity";
import { NewMarca } from "../../domain/model/new-marca.entity";
import { MarcaRepository } from "../../domain/repository/marca.repository";
import { ResultContract } from "@core/application/contract/result/result.contract";
import { CrearMarcaCommand } from "../contract/command/crear-marca.command";

export class CrearMarcaUseCase extends BaseUseCase<CrearMarcaCommand, ResultContract<Marca>>{
    constructor(
        private readonly marcaRepository: MarcaRepository
    ) { super(); }

    async execute(command: CrearMarcaCommand): Promise<ResultContract<Marca>> {
        const nuevaMarca = new NewMarca(command.data.descripcion)
        return { data: await this.marcaRepository.create(nuevaMarca) }
    }
}