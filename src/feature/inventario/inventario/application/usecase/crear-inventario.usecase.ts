import { CommandContract } from "@core/application/contract/command/command.contract";
import { BaseUseCase } from "@core/application/usecase/base.usecase";
import { Inventario } from "../../domain/model/inventario";
import { InventarioRepository } from "../../domain/repository/inventario.repository";
import { ProductoRepository } from "../../domain/repository/producto.repository";
import { VarianteRepository } from "../../domain/repository/variante.repository";
import { NewInventario } from "../../domain/model/new-inventario";
import { NotFoundException } from "@core/application/exception/not-found.exception";
import { NewDetalleInventario } from "../../domain/model/new-detalle-inventario";
import { StockRepository } from "../../domain/repository/stock.repository";
import { StockId } from "../../domain/model/stock-id";
import { Stock } from "../../domain/model/stock";
import { ResultContract } from "@core/application/contract/result/result.contract";

interface InventarioData {
    id?: number,
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

export class CrearInventarioUseCase extends BaseUseCase<CommandContract<InventarioData>, ResultContract<Inventario>>{
    
    private readonly defaultIdDeposito = 1;

    constructor(
        private inventarioRepository: InventarioRepository,
        private productoRepository: ProductoRepository,
        private varianteRepository: VarianteRepository,
        private stockRepository: StockRepository
    ){ super() }
    
    async execute(command: CommandContract<InventarioData>): Promise<ResultContract<Inventario>> {
        const newInventario = new NewInventario(command.data.fecha, command.data.observacion);
        console.log(command)
        for(let detalleData of command.data.detalles){
            const producto = await this.productoRepository.findById(detalleData.idproducto);
            const variante = await this.varianteRepository.findById(detalleData.idvariante);
            if(producto == null) throw new NotFoundException('Producto', detalleData.idproducto);
            if(variante == null) throw new NotFoundException('Variante', detalleData.idvariante);
            
            const stockId = new StockId(this.defaultIdDeposito, detalleData.idproducto, detalleData.idvariante);
            let stock = await this.stockRepository.findById(stockId);
            if(stock == null){
                const newStock = new Stock(stockId, 0, new Date(), 0);
                stock = await this.stockRepository.create(newStock);
            }
            //const diferencia = detalleData.cantidad - stock.cantidad;
            const newDetalle = new NewDetalleInventario(producto, variante, detalleData.cantidad, stock.cantidad);
            stock.cantidad = detalleData.cantidad;
            await this.stockRepository.edit(stock);
            newInventario.agregarDetalle(newDetalle);
        }
        return { data: await this.inventarioRepository.create(newInventario) };
    }

}