import { CommandContract } from "@core/application/contract/command/command.contract"
import { ResultContract } from "@core/application/contract/result/result.contract"
import { BaseUseCase } from "@core/application/usecase/base.usecase"
import { Inventario } from "../../domain/model/inventario"
import { InventarioRepository } from "../../domain/repository/inventario.repository"
import { NotFoundException } from "@core/application/exception/not-found.exception"
import { DetalleInventario } from "../../domain/model/detalle-inventario"
import { ProductoRepository } from "../../domain/repository/producto.repository"
import { VarianteRepository } from "../../domain/repository/variante.repository"
import { StockRepository } from "../../domain/repository/stock.repository"
import { StockId } from "../../domain/model/stock-id"
import { EditInventario } from "../../domain/model/edit-inventario"
import { NewDetalleInventario } from "../../domain/model/new-detalle-inventario"

interface InventarioData {
    id: number,
    fecha: Date,
    observacion?: string,
    detalles: DetalleInventarioData[]
}

interface DetalleInventarioData {
    id?: number,
    idproducto: number,
    idvariante: number,
    cantidad: number
}

interface EditarInventarioCommand extends CommandContract<InventarioData> {
    previousId: number;
}

export class EditarInventarioUseCase extends BaseUseCase<EditarInventarioCommand, ResultContract<Inventario>> {
    
    private readonly defaultIdDeposito = 1;

    constructor(
        private inventarioRepository: InventarioRepository,
        private productoRepository: ProductoRepository,
        private varianteRepository: VarianteRepository,
        private stockRepository: StockRepository
    ){ super() }

    async execute(command: EditarInventarioCommand): Promise<ResultContract<Inventario>> {
        const previousInventario = await this.inventarioRepository.findById(command.previousId);
        if(previousInventario == null) throw new NotFoundException('Inventario', command.previousId);
        
        const inventario = new EditInventario(command.data.id, command.data.fecha, command.data.observacion);
        for(let detalleData of command.data.detalles){
            const previousDetalle = previousInventario.detalles.find(d => d.id == detalleData.id);
            const producto = await this.productoRepository.findById(detalleData.idproducto);
            const variante = await this.varianteRepository.findById(detalleData.idvariante);
            if(producto == null) throw new NotFoundException('Produdcto', detalleData.idproducto);
            if(variante == null) throw new NotFoundException('Variante', detalleData.idvariante);
            
            const stockId = new StockId(this.defaultIdDeposito, producto.id, variante.id);
            const stock = await this.stockRepository.findById(stockId);
            if(stock == null) throw new NotFoundException('Stock', JSON.stringify(stockId));

            const cantidadPrevia = previousDetalle?.cantidadPrevia ?? stock.cantidad;
            inventario.agregarDetalle(
                detalleData.id != null ?
                new DetalleInventario(detalleData.id, producto, variante, detalleData.cantidad, cantidadPrevia) :
                new NewDetalleInventario(producto, variante, detalleData.cantidad, cantidadPrevia)
            );

            stock.cantidad = detalleData.cantidad;
            await this.stockRepository.edit(stock);
        }
        const savedInventario = await this.inventarioRepository.edit(inventario);
        return { data: savedInventario }
    }

}