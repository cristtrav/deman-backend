import { Color } from "@feature/inventario/color/domain/model/color.entity"
import { ColorRepository } from "@feature/inventario/color/domain/repository/color.repository"
import { ColorNotFoundException } from "../exception/color-not-found.exception"
import { NotFoundException } from "@core/application/exception/not-found.exception"
import { ColorAlreadyExistsException } from "@feature/inventario/color/domain/exception/color-already-exists.exception"

export class ActualizarColorUseCase {
    constructor(
        private readonly colorRepository: ColorRepository
    ) { }

    async execute(id: number, descripcion: string): Promise<Color> {
        const colorToUpdate = await this.colorRepository.getById(id)
        if (!colorToUpdate) throw new NotFoundException("Color", id)

        const normalizedDescription = descripcion.trim().toLowerCase()
        const duplicatedColor = await this.colorRepository.findByName(normalizedDescription)

        if (duplicatedColor && duplicatedColor.getId() !== id) throw new ColorAlreadyExistsException(descripcion)

        return this.colorRepository.update(id, descripcion)
    }
}
