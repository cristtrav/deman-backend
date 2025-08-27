import { TipoRepository } from "../../domain/repository/tipo.repository"
import { Tipo } from "../../domain/model/tipo.entity"
import { BaseUseCase } from "@core/application/usecase/base.usecase"
import { EditarTipoCommand } from "../contract/command/editar-tipo.command"
import { ResultContract } from "@core/application/contract/result/result.contract"

export class EditarTipoUseCase extends BaseUseCase<EditarTipoCommand, ResultContract<Tipo>> {
    constructor(
        private readonly tipoRepository: TipoRepository
    ) { super() }

    async execute(command: EditarTipoCommand): Promise<ResultContract<Tipo>> {
        const tipo = new Tipo(command.data.id, command.data.descripcion);
        const savedTipo = await this.tipoRepository.edit(tipo);
        return { data: savedTipo }
    }
}
