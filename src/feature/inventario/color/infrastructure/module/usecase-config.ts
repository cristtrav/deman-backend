import { CrearColorUseCase } from "@feature/inventario/color/application/usecase/crear.usecase";
import { EliminarColorUseCase } from "@feature/inventario/color/application/usecase/eliminar.usecase";
import { ColorRepository } from "@feature/inventario/color/domain/repository/color.repository";
import { Provider } from "@nestjs/common";
import { EditarColorUseCase } from "../../application/usecase/editar.usecase";
import { ConsultarColoresUseCase } from "../../application/usecase/consultar.usecase";
import { ColorReadRepository } from "../../application/read-repository/color.read-repository";
import { ConsultarColorPorIdUseCase } from "../../application/usecase/consultar-por-id.usecase";


export default <Provider[]>[
    

    {
        provide: CrearColorUseCase,
        useFactory: (colorRepository: ColorRepository) => new CrearColorUseCase(colorRepository),
        inject: [ ColorRepository ]
    },
    {
        provide: EliminarColorUseCase,
        useFactory: (colorRepository: ColorRepository) => new EliminarColorUseCase(colorRepository),
        inject: [ ColorRepository ]
    },
    {
        provide: EditarColorUseCase,
        useFactory: (colorRepository: ColorRepository) => new EditarColorUseCase(colorRepository),
        inject: [ ColorRepository ]
    },
    {
        provide: ConsultarColoresUseCase,
        useFactory: (colorReadRepository: ColorReadRepository) => new ConsultarColoresUseCase(colorReadRepository),
        inject: [ ColorReadRepository ]
    },
    {
        provide: ConsultarColorPorIdUseCase,
        useFactory: (colorRepository: ColorRepository) => new ConsultarColorPorIdUseCase(colorRepository),
        inject: [ ColorRepository ]
    },
    
]