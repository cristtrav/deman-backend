import { ActualizarMarcaUseCase } from "@feature/marca/application/usecase/actualizar.usecase";
import { BuscarMarcaPorNombreUseCase } from "@feature/marca/application/usecase/buscar-por-nombre.usecase";
import { ContarMarcasUseCase } from "@feature/marca/application/usecase/contar.usecase";
import { CrearMarcaUseCase } from "@feature/marca/application/usecase/crear.usecase";
import { EliminarMarcaUseCase } from "@feature/marca/application/usecase/eliminar.usecase";
import { ListarMarcasUseCase } from "@feature/marca/application/usecase/listar.usecase";
import { ObtenerMarcaPorIdUseCase } from "@feature/marca/application/usecase/obtener-por-id.usecase";
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