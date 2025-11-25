import { Provider } from "@nestjs/common";
import { CrearInventarioUseCase } from "../../application/usecase/crear-inventario.usecase";
import { InventarioRepository } from "../../domain/repository/inventario.repository";
import { ProductoRepository } from "../../domain/repository/producto.repository";
import { VarianteRepository } from "../../domain/repository/variante.repository";
import { StockRepository } from "../../domain/repository/stock.repository";
import { ConsultarInventariosUseCase } from "../../application/usecase/consultar-inventarios.usecase";
import { InventarioReadRepository } from "../../application/read-repository/inventario.read-repository";
import { EditarInventarioUseCase } from "../../application/usecase/editar-inventario.usecase";
import { ConsultarInventarioPorIdUseCase } from "../../application/usecase/consultar-inventario-por-id.usecase";
import { EliminarInventarioUseCase } from "../../application/usecase/eliminar-inventario.usecase";

export default <Provider[]> [
    {
        provide: CrearInventarioUseCase,
        useFactory: (
            inventarioRepository: InventarioRepository,
            productoRepository: ProductoRepository,
            varianteRepository: VarianteRepository,
            stockRepository: StockRepository
        ) => new CrearInventarioUseCase(
            inventarioRepository,
            productoRepository,
            varianteRepository,
            stockRepository
        ),
        inject: [ InventarioRepository, ProductoRepository, VarianteRepository, StockRepository ]
    },
    {
        provide: ConsultarInventariosUseCase,
        useFactory: (
            inventarioReadRepo: InventarioReadRepository
        ) => new ConsultarInventariosUseCase(inventarioReadRepo),
        inject: [ InventarioReadRepository ]
    },
    {
        provide: EditarInventarioUseCase,
        useFactory: (
            inventarioRepository: InventarioRepository,
            productoRepository: ProductoRepository,
            varianteRepository: VarianteRepository,
            stockRepository: StockRepository
        ) => new EditarInventarioUseCase(
            inventarioRepository,
            productoRepository,
            varianteRepository,
            stockRepository
        ),
        inject: [ InventarioRepository, ProductoRepository, VarianteRepository, StockRepository ]
    },
    {
        provide: ConsultarInventarioPorIdUseCase,
        useFactory: (inventarioRepository: InventarioRepository) => new ConsultarInventarioPorIdUseCase(inventarioRepository),
        inject: [ InventarioRepository ]
    },
    {
        provide: EliminarInventarioUseCase,
        useFactory: (
            inventarioRepository: InventarioRepository,
            stockRepository: StockRepository,
        ) => new EliminarInventarioUseCase(
            inventarioRepository,
            stockRepository
        ),
        inject: [ InventarioRepository, StockRepository ] 
    }
]