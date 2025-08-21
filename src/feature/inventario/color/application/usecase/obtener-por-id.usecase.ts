import { NotFoundException } from "@core/application/exception/not-found.exception";
import { Color } from "@feature/inventario/color/domain/model/color.entity";
import { ColorRepository } from "@feature/inventario/color/domain/repository/color.repository";

export class ObtenerColorPorIdUseCase {
    constructor(
        private readonly colorRepository: ColorRepository
    ) { }

    async execute(id: number): Promise<Color> {
        const color = await this.colorRepository.getById(id)
        if (!color) throw new NotFoundException("Color", id);
        return color
    }
}