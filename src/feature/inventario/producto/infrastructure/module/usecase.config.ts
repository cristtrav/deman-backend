import { Provider } from "@nestjs/common";
import { CrearProductoUseCase } from "../../application/usecase/crear-producto.usecase";
import { CategoriaRepository } from "../../domain/repository/categoria.repository";
import { MarcaRepository } from "../../domain/repository/marca.repository";
import { ProductoRepository } from "../../domain/repository/producto.repository";
import { TipoRepository } from "../../domain/repository/tipo.repository";
import { UnidadMedidaRepository } from "../../domain/repository/unidad-medida.repository";
import { ConsultarProductosUseCase } from "../../application/usecase/consultar-productos.usecase";
import { ProductoReadRepository } from "../../application/read/repository/producto.read-repository";
import { EditarProductoUseCase } from "../../application/usecase/editar-producto.usecase";
import { EliminarProductoUseCase } from "../../application/usecase/eliminar-producto.usecase";

export default <Provider[]>[
    {
        provide: ConsultarProductosUseCase,
        useFactory: (productoReadRepository: ProductoReadRepository) => new ConsultarProductosUseCase(productoReadRepository),
        inject: [ ProductoReadRepository ]
    },
    {
        provide: CrearProductoUseCase,
        useFactory: (
            marcaRepository: MarcaRepository,
            categoriaRepository: CategoriaRepository,
            tipoRepository: TipoRepository,
            unidadMedidaRepository: UnidadMedidaRepository,
            productoRepository: ProductoRepository
        ) => new CrearProductoUseCase(
            marcaRepository,
            categoriaRepository,
            tipoRepository,
            unidadMedidaRepository,
            productoRepository
        ),
        inject: [
            MarcaRepository,
            CategoriaRepository,
            TipoRepository,
            UnidadMedidaRepository,
            ProductoRepository
        ]
    },
    {
        provide: EditarProductoUseCase,
        useFactory: (
            productoRepository: ProductoRepository,
            marcaRepository: MarcaRepository,
            tipoRepository: TipoRepository,
            categoriaRepository: CategoriaRepository,            
            unidadMedidaRepository: UnidadMedidaRepository,
            
        ) => new EditarProductoUseCase(
            productoRepository,
            marcaRepository,
            tipoRepository,
            categoriaRepository,
            unidadMedidaRepository
        ),
        inject: [
            ProductoRepository,
            MarcaRepository,
            TipoRepository,
            CategoriaRepository,
            UnidadMedidaRepository,
        ]
    },
    {
        provide: EliminarProductoUseCase,
        useFactory: (productoRepository: ProductoRepository) => new EliminarProductoUseCase(productoRepository),
        inject: [ ProductoRepository ]
    }
]