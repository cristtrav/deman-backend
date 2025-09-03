import { BaseUseCase } from "@core/application/usecase/base.usecase"
import { Color } from "@feature/inventario/color/domain/model/color.entity"
import { NewColor } from "@feature/inventario/color/domain/model/new-color.entity"
import { ColorRepository } from "@feature/inventario/color/domain/repository/color.repository"
import { CrearColorCommand } from "../contract/command/crear-color.command"
import { ResultContract } from "@core/application/contract/result/result.contract"

export class CrearColorUseCase extends BaseUseCase<CrearColorCommand, ResultContract<Color>> {
    constructor(
        private readonly colorRepository: ColorRepository
    ) { super() }

    async execute(command: CrearColorCommand): Promise<ResultContract<Color>> {
        const nuevoColor = new NewColor(command.data.descripcion)
        return { data: await this.colorRepository.create(nuevoColor) }
    }
}