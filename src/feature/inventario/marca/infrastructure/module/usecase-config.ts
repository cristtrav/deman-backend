import { Provider } from "@nestjs/common";
import { ActualizarMarcaUseCase } from "../../application/usecase/actualizar.usecase";
import { BuscarMarcaPorNombreUseCase } from "../../application/usecase/buscar-por-nombre.usecase";
import { ContarMarcasUseCase } from "../../application/usecase/contar.usecase";
import { CrearMarcaUseCase } from "../../application/usecase/crear.usecase";
import { EliminarMarcaUseCase } from "../../application/usecase/eliminar.usecase";
import { ListarMarcasUseCase } from "../../application/usecase/listar.usecase";
import { ObtenerMarcaPorIdUseCase } from "../../application/usecase/obtener-por-id.usecase";
import { MarcaRepository } from "../../domain/repository/marca.repository";

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