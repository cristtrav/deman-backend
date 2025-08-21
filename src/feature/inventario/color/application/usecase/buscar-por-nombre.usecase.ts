import { Color } from "@feature/inventario/color/domain/model/color.entity"
import { ColorRepository } from "@feature/inventario/color/domain/repository/color.repository"
import { ColorNotFoundException } from "../exception/color-not-found.exception"

export class BuscarColorPorNombreUseCase {
    constructor(
        private readonly colorRepository: ColorRepository
    ) { }

    async execute(descripcion: string): Promise<Color> {

        const color = await this.colorRepository.findByName(descripcion)
        if (!color) throw new ColorNotFoundException(descripcion)
        return color
    }
}