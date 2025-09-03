import { BaseUseCase } from "@core/application/usecase/base.usecase"
import { CrearTipoCommand } from "../contract/command/crear-tipo.command"
import { ResultContract } from "@core/application/contract/result/result.contract"
import { TipoRepository } from "../../domain/repository/tipo.repository"
import { NewTipo } from "../../domain/model/new-tipo.entity"
import { Tipo } from "../../domain/model/tipo.entity"

export class CrearTipoUseCase extends BaseUseCase<CrearTipoCommand, ResultContract<Tipo>> {
    constructor(
        private readonly tipoRepository: TipoRepository
    ) { super() }

    async execute(command: CrearTipoCommand): Promise<ResultContract<Tipo>> {
        const newTipo = new NewTipo( command.data.descripcion)
        return { data: await this.tipoRepository.create(newTipo) }
    }
}