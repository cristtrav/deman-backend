
import { NotFoundException } from "@core/application/exception/not-found.exception";
import { Tipo } from "@feature/tipo/domain/model/tipo.entity";
import { TipoRepository } from "@feature/tipo/domain/repository/tipo.repository";

export class ObtenerTipoPorIdUseCase {
    constructor(
        private readonly tipoRepository: TipoRepository
    ) { }

    async execute(id: number): Promise<Tipo> {
        const tipo = await this.tipoRepository.getById(id)
        if (!tipo) throw new NotFoundException("Tipo", id);
        return tipo
    }
}