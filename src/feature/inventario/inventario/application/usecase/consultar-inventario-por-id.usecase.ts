import { BaseUseCase } from "@core/application/usecase/base.usecase"
import { Inventario } from "../../domain/model/inventario";
import { InventarioRepository } from "../../domain/repository/inventario.repository";
import { NotFoundException } from "@core/application/exception/not-found.exception";

export class ConsultarInventarioPorIdUseCase extends BaseUseCase<number, Inventario> {

    constructor(
        private inventarioRepository: InventarioRepository
    ){ super() }

    async execute(id: number): Promise<Inventario> {
        const inventario = await this.inventarioRepository.findById(id);
        if(inventario == null) throw new NotFoundException('Inventario', id);
        return inventario;
    }

}