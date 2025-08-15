import { NotFoundException } from "@core/application/exception/not-found.exception"
import { ColorRepository } from "@feature/color/domain/repository/color.repository"

export class EliminarColorUseCase {
    constructor(
        private readonly colorRepository: ColorRepository
    ) { }
    async execute(id: number): Promise<void> {
        const color = await this.colorRepository.getById(id)
        if (!color) throw new NotFoundException("Color", id)

        await this.colorRepository.delete(id)
    }
}