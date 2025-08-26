import { NotFoundException } from "@core/application/exception/not-found.exception";
import { BaseUseCase } from "@core/application/usecase/base.usecase";
import { Color } from "@feature/inventario/color/domain/model/color.entity";
import { ColorRepository } from "@feature/inventario/color/domain/repository/color.repository";

export class ConsultarColorPorIdUseCase extends BaseUseCase<number, Color>{
    
    constructor(
        private readonly colorRepository: ColorRepository
    ) {super(); }

    async execute(id: number): Promise<Color> {
        const color = await this.colorRepository.findById(id)
        if (color == null) throw new NotFoundException("Color", id);
        return color
    }
}