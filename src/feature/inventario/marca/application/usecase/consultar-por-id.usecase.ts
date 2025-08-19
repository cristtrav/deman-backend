import { BaseUseCase } from "@core/application/usecase/base.usecase";
import { Marca } from "../../domain/model/marca.entity";
import { MarcaRepository } from "../../domain/repository/marca.repository";
import { NotFoundException } from "@core/application/exception/not-found.exception";

export class ConsultarMarcaPorIdUseCase extends BaseUseCase<number, Marca>{
    
    constructor(
        private readonly marcaRepository: MarcaRepository
    ){ super(); }

    async execute(id: number): Promise<Marca> {
        const marca = await this.marcaRepository.findById(id);
        if(marca == null) throw new NotFoundException('Marca', id);
        return marca;
    }

}