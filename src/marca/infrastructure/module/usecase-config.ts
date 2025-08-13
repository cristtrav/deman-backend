import { Provider } from "@nestjs/common";
import { ActualizarMarcaUseCase } from "src/marca/application/use-case/actualizar.use-case";
import { BuscarMarcaPorNombreUseCase } from "src/marca/application/use-case/buscar-por-nombre.use-case";
import { ContarMarcasUseCase } from "src/marca/application/use-case/contar.use-case";
import { CrearMarcaUseCase } from "src/marca/application/use-case/crear.use-case";
import { EliminarMarcaUseCase } from "src/marca/application/use-case/eliminar.use-case";
import { ListarMarcasUseCase } from "src/marca/application/use-case/listar.use-case";
import { ObtenerMarcaPorIdUseCase } from "src/marca/application/use-case/obtener-por-id.use-case";
import { MarcaRepository } from "src/marca/domain/repository/marca.repository";

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