import { ColorRepository } from "@feature/color/domain/repository/color.repository";

export class ContarColoresUseCase {
    constructor(
        private readonly colorRepository: ColorRepository
    ) { }

    execute(): Promise<number>{
        return this.colorRepository.count()
    }
}