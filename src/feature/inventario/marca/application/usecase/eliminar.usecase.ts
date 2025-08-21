import { NotFoundException } from "@core/application/exception/not-found.exception"
import { MarcaRepository } from "../../domain/repository/marca.repository"
import { BaseUseCase } from "@core/application/usecase/base.usecase"
import { EliminarCategoriaCommand } from "@feature/inventario/categoria/application/contract/command/eliminar-categoria.command"
import { EliminarMarcaCommand } from "../contract/command/eliminar-marca.command";

export class EliminarMarcaUseCase extends BaseUseCase<EliminarCategoriaCommand, void> {
    
    constructor(
        private readonly marcaTypeOrmRepository: MarcaRepository
    ) { super(); }

    async execute(command: EliminarMarcaCommand): Promise<void> {
        const marcaOrm = await this.marcaTypeOrmRepository.findById(command.data.id);
        if(!marcaOrm) throw new NotFoundException("Marca", command.data.id);
        
        await this.marcaTypeOrmRepository.delete(command.data.id);
    }
}