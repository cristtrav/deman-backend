import { ActualizarMarcaUseCase } from "@feature/marca/application/use-case/actualizar.use-case";
import { BuscarMarcaPorNombreUseCase } from "@feature/marca/application/use-case/buscar-por-nombre.use-case";
import { ContarMarcasUseCase } from "@feature/marca/application/use-case/contar.use-case";
import { CrearMarcaUseCase } from "@feature/marca/application/use-case/crear.use-case";
import { EliminarMarcaUseCase } from "@feature/marca/application/use-case/eliminar.use-case";
import { ListarMarcasUseCase } from "@feature/marca/application/use-case/listar.use-case";
import { ObtenerMarcaPorIdUseCase } from "@feature/marca/application/use-case/obtener-por-id.use-case";
import { MarcaRepository } from "@feature/marca/domain/repository/marca.repository";
import { Provider } from "@nestjs/common";

export default <Provider[]>[
    
    {
        provide: ContarMarcasUseCase,
        useFactory: (marcaRepository: MarcaRepository) => new ContarMarcasUseCase(marcaRepository),
        inject: [ MarcaRepository ]
    },
    {
        provide: CrearMarcaUseCase,
        useFactory: (marcaRepository: MarcaRepository) => new CrearMarcaUseCase(marcaRepository),
        inject: [ MarcaRepository ]
    },
    {
        provide: ObtenerMarcaPorIdUseCase,
        useFactory: (marcaRepository: MarcaRepository) => new ObtenerMarcaPorIdUseCase(marcaRepository),
        inject: [ MarcaRepository ]
    },
    {
        provide: EliminarMarcaUseCase,
        useFactory: (marcaRepository: MarcaRepository) => new EliminarMarcaUseCase(marcaRepository),
        inject: [ MarcaRepository ]
    },
    {
        provide: ActualizarMarcaUseCase,
        useFactory: (marcaRepository: MarcaRepository) => new ActualizarMarcaUseCase(marcaRepository),
        inject: [ MarcaRepository ]
    },
    {
        provide: ListarMarcasUseCase,
        useFactory: (marcaRepository: MarcaRepository) => new ListarMarcasUseCase(marcaRepository),
        inject: [ MarcaRepository ]
    },
    {
        provide: BuscarMarcaPorNombreUseCase,
        useFactory: (marcaRepository: MarcaRepository) => new BuscarMarcaPorNombreUseCase(marcaRepository),
        inject: [ MarcaRepository ]
    },
    
]