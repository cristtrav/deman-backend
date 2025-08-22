import { NotFoundException } from "@core/application/exception/not-found.exception"
import { BaseUseCase } from "@core/application/usecase/base.usecase"
import { ColorRepository } from "@feature/inventario/color/domain/repository/color.repository"
import { EliminarColorCommand } from "../contract/command/eliminar-color.command"

export class EliminarColorUseCase extends BaseUseCase<EliminarColorCommand, void>{
    constructor(
        private readonly colorRepository: ColorRepository
    ) { super ()}
    async execute(command: EliminarColorCommand): Promise<void> {
        const color = await this.colorRepository.findById(command.data.id)
        if (!color) throw new NotFoundException("Color", command.data.id)

        await this.colorRepository.delete(command.data.id)
    }
}