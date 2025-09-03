import { CommandContract } from "@core/application/contract/command/command.contract";
import { BaseUseCase } from "@core/application/usecase/base.usecase";
import { ProductoRepository } from "../../domain/repository/producto.repository";

interface ProductoData {
    id: number
}

interface EliminarProductoCommand extends CommandContract<ProductoData>{ }

export class EliminarProductoUseCase extends BaseUseCase<EliminarProductoCommand, void>{

    constructor(
        private productoRepository: ProductoRepository
    ){ super() }

    async execute(command: EliminarProductoCommand): Promise<void> {
        await this.productoRepository.delete(command.data.id);
    }

}