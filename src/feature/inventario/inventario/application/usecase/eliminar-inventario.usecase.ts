import { CommandContract } from "@core/application/contract/command/command.contract";
import { BaseUseCase } from "@core/application/usecase/base.usecase";
import { InventarioRepository } from "../../domain/repository/inventario.repository";
import { StockRepository } from "../../domain/repository/stock.repository";
import { ProductoRepository } from "../../domain/repository/producto.repository";
import { VarianteRepository } from "../../domain/repository/variante.repository";
import { StockId } from "../../domain/model/stock-id";
import { NotFoundException } from "@core/application/exception/not-found.exception";

export class EliminarInventarioUseCase extends BaseUseCase<CommandContract<{id: number}>, void>{
    
    private readonly defaultDeposito: number = 1

    constructor(
        private inventarioRepository: InventarioRepository,
        private stockRepository: StockRepository
    ){ super() }
    
    async execute(command: CommandContract<{id: number}>): Promise<void> {
        const inventario = await this.inventarioRepository.findById(command.data.id);
        if(inventario == null) throw new NotFoundException('Inventario', command.data.id)
        for(let detalle of inventario.detalles){
            const stock = await this.stockRepository.findById(new StockId(
                this.defaultDeposito,
                detalle.producto.id,
                detalle.variante.id
            ));
            if(stock == null) throw new NotFoundException('Stock', `(Cod. Deposito: ${this.defaultDeposito}, Cod. Producto: ${detalle.producto.id}, Cod. Variante: ${detalle.variante.id})`);
            stock.cantidad = detalle.cantidadPrevia

            await this.stockRepository.edit(stock);
        }
        await this.inventarioRepository.delete(command.data.id);
    }

}