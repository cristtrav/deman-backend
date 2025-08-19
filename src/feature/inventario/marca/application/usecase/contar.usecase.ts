import { MarcaRepository } from "../../domain/repository/marca.repository";

export class ContarMarcasUseCase {
    constructor(
        private readonly marcaRepository: MarcaRepository
    ) { }

    execute(): Promise<number>{
        return this.marcaRepository.contar()
    }
}