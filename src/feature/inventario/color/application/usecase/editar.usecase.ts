import { Color } from "@feature/inventario/color/domain/model/color.entity"
import { ColorRepository } from "@feature/inventario/color/domain/repository/color.repository"
import { BaseUseCase } from "@core/application/usecase/base.usecase"
import { ResultContract } from "@core/application/contract/result/result.contract"
import { EditarColorCommand } from "../contract/command/editar-color.command"

export class EditarColorUseCase extends BaseUseCase<EditarColorCommand, ResultContract<Color>> {

    constructor(
        private readonly colorRepository: ColorRepository
    ) { super() }

    async execute(command: EditarColorCommand): Promise<ResultContract<Color>> {
        const color = new Color(command.data.id, command.data.descripcion);
        const savedColor = await this.colorRepository.edit(color);
        return { data: savedColor }
    }
}
