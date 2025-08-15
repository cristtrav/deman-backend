
import { ActualizarTipoUseCase } from "@feature/tipo/application/usecase/actualizar.usecase";
import { BuscarTipoPorNombreUseCase } from "@feature/tipo/application/usecase/buscar-por-nombre.usecase";
import { ContarTiposUseCase } from "@feature/tipo/application/usecase/contar.usecase";
import { CrearTipoUseCase } from "@feature/tipo/application/usecase/crear.usecase";
import { EliminarTipoUseCase } from "@feature/tipo/application/usecase/eliminar.usecase";
import { ObtenerTipoPorIdUseCase } from "@feature/tipo/application/usecase/obtener-por-id.usecase";
import { TipoRepository } from "@feature/tipo/domain/repository/tipo.repository";
import { Provider } from "@nestjs/common";


export default <Provider[]>[
    
    {
        provide: ContarTiposUseCase,
        useFactory: (tipoRepository: TipoRepository) => new ContarTiposUseCase(tipoRepository),
        inject: [ TipoRepository ]
    },
    {
        provide: CrearTipoUseCase,
        useFactory: (tipoRepository: TipoRepository) => new CrearTipoUseCase(tipoRepository),
        inject: [ TipoRepository ]
    },
    {
        provide: ObtenerTipoPorIdUseCase,
        useFactory: (tipoRepository: TipoRepository) => new ObtenerTipoPorIdUseCase(tipoRepository),
        inject: [ TipoRepository ]
    },
    {
        provide: EliminarTipoUseCase,
        useFactory: (tipoRepository: TipoRepository) => new EliminarTipoUseCase(tipoRepository),
        inject: [ TipoRepository ]
    },
    {
        provide: ActualizarTipoUseCase,
        useFactory: (tipoRepository: TipoRepository) => new ActualizarTipoUseCase(tipoRepository),
        inject: [ TipoRepository ]
    },
    {
        provide: BuscarTipoPorNombreUseCase,
        useFactory: (tipoRepository: TipoRepository) => new BuscarTipoPorNombreUseCase(tipoRepository),
        inject: [ TipoRepository ]
    },
    
]