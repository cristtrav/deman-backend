import { ColorAlreadyExistsException } from "@feature/inventario/color/domain/exception/color-already-exists.exception"
import { Color } from "@feature/inventario/color/domain/model/color.entity"
import { NewColor } from "@feature/inventario/color/domain/model/new-color.entity"
import { ColorRepository } from "@feature/inventario/color/domain/repository/color.repository"

export class CrearColorUseCase {
    constructor(
        private readonly colorRepository: ColorRepository
    ) { }

    async execute(descripcion: string): Promise<Color> {
        const normalizedDescription = descripcion.trim().toLowerCase()
        const colorFound = await this.colorRepository.findByName(normalizedDescription)

        if (colorFound) throw new ColorAlreadyExistsException(descripcion)

        const newColor = new NewColor(descripcion.trim())
        return this.colorRepository.create(newColor)
    }
}