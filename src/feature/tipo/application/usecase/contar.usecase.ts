import { TipoRepository } from "@feature/tipo/domain/repository/tipo.repository";

export class ContarTiposUseCase {
    constructor(
        private readonly tipoRepository: TipoRepository
    ) { }

    execute(): Promise<number>{
        return this.tipoRepository.count()
    }
}