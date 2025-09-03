import { Provider } from "@nestjs/common";
import { CrearTipoUseCase } from "../../application/usecase/crear.usecase";
import { TipoRepository } from "../../domain/repository/tipo.repository";
import { ConsultarTipoPorIdUseCase } from "../../application/usecase/consultar-por-id.usecase";
import { EliminarTipoUseCase } from "../../application/usecase/eliminar.usecase";
import { EditarTipoUseCase } from "../../application/usecase/editar.usecase";
import { ConsultarTiposUseCase } from "../../application/usecase/consultar.usecase";
import { TipoReadRepository } from "../../application/repository/tipo.read-repository";



export default <Provider[]>[
    
    {
        provide: CrearTipoUseCase,
        useFactory: (tipoRepository: TipoRepository) => new CrearTipoUseCase(tipoRepository),
        inject: [ TipoRepository ]
    },
    {
        provide: ConsultarTipoPorIdUseCase,
        useFactory: (tipoRepository: TipoRepository) => new ConsultarTipoPorIdUseCase(tipoRepository),
        inject: [ TipoRepository ]
    },
    {
        provide: EliminarTipoUseCase,
        useFactory: (tipoRepository: TipoRepository) => new EliminarTipoUseCase(tipoRepository),
        inject: [ TipoRepository ]
    },
    {
        provide: EditarTipoUseCase,
        useFactory: (tipoRepository: TipoRepository) => new EditarTipoUseCase(tipoRepository),
        inject: [ TipoRepository ]
    },
    {
        provide: ConsultarTiposUseCase,
        useFactory: (tipoReadRepository: TipoReadRepository) => new ConsultarTiposUseCase(tipoReadRepository),
        inject: [ TipoReadRepository ]
    },
    
]