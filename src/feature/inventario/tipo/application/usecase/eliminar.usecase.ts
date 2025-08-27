import { NotFoundException } from "@core/application/exception/not-found.exception"
import { BaseUseCase } from "@core/application/usecase/base.usecase"
import { EliminarTipoCommand } from "../contract/command/eliminar-tipo.command"
import { TipoRepository } from "../../domain/repository/tipo.repository"

export class EliminarTipoUseCase extends BaseUseCase<EliminarTipoCommand, void>{
    constructor(
        private readonly tipoRepository: TipoRepository
    ) {super() }

    async execute(command: EliminarTipoCommand): Promise<void> {
        const tipo = await this.tipoRepository.findById(command.data.id)
        if (!tipo) throw new NotFoundException("Tipo", command.data.id)

        await this.tipoRepository.delete(command.data.id)
    }
}