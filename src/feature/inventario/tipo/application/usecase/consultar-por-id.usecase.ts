
import { NotFoundException } from "@core/application/exception/not-found.exception";
import { BaseUseCase } from "@core/application/usecase/base.usecase";
import { Tipo } from "../../domain/model/tipo.entity";
import { TipoRepository } from "../../domain/repository/tipo.repository";

export class ConsultarTipoPorIdUseCase extends BaseUseCase<number, Tipo> {
    constructor(
        private readonly tipoRepository: TipoRepository
    ) { super()}

    async execute(id: number): Promise<Tipo> {
        const tipo = await this.tipoRepository.findById(id)
        if (tipo == null) throw new NotFoundException("Tipo", id);
        return tipo
    }
}