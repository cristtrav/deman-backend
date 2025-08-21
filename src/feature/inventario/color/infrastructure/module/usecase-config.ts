import { ActualizarColorUseCase } from "@feature/inventario/color/application/usecase/actualizar.usecase";
import { BuscarColorPorNombreUseCase } from "@feature/inventario/color/application/usecase/buscar-por-nombre.usecase";
import { ContarColoresUseCase } from "@feature/inventario/color/application/usecase/contar.usecase";
import { CrearColorUseCase } from "@feature/inventario/color/application/usecase/crear.usecase";
import { EliminarColorUseCase } from "@feature/inventario/color/application/usecase/eliminar.usecase";
import { ObtenerColorPorIdUseCase } from "@feature/inventario/color/application/usecase/obtener-por-id.usecase";
import { ColorRepository } from "@feature/inventario/color/domain/repository/color.repository";
import { Provider } from "@nestjs/common";


export default <Provider[]>[
    
    {
        provide: ContarColoresUseCase,
        useFactory: (colorRepository: ColorRepository) => new ContarColoresUseCase(colorRepository),
        inject: [ ColorRepository ]
    },
    {
        provide: CrearColorUseCase,
        useFactory: (colorRepository: ColorRepository) => new CrearColorUseCase(colorRepository),
        inject: [ ColorRepository ]
    },
    {
        provide: ObtenerColorPorIdUseCase,
        useFactory: (colorRepository: ColorRepository) => new ObtenerColorPorIdUseCase(colorRepository),
        inject: [ ColorRepository ]
    },
    {
        provide: EliminarColorUseCase,
        useFactory: (colorRepository: ColorRepository) => new EliminarColorUseCase(colorRepository),
        inject: [ ColorRepository ]
    },
    {
        provide: ActualizarColorUseCase,
        useFactory: (colorRepository: ColorRepository) => new ActualizarColorUseCase(colorRepository),
        inject: [ ColorRepository ]
    },
    {
        provide: BuscarColorPorNombreUseCase,
        useFactory: (colorRepository: ColorRepository) => new BuscarColorPorNombreUseCase(colorRepository),
        inject: [ ColorRepository ]
    },
    
]