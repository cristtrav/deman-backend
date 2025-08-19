import { Provider } from "@nestjs/common";
import { EditarMarcaUseCase } from "../../application/usecase/editar.usecase";
import { CrearMarcaUseCase } from "../../application/usecase/crear.usecase";
import { EliminarMarcaUseCase } from "../../application/usecase/eliminar.usecase";
import { ConsultarMarcasUseCase } from "../../application/usecase/consultar.usecase";
import { MarcaRepository } from "../../domain/repository/marca.repository";
import { MarcaReadRepository } from "../../application/read-repository/marca.read-repository";
import { ConsultarMarcaPorIdUseCase } from "../../application/usecase/consultar-por-id.usecase";

export default <Provider[]>[
    {
        provide: CrearMarcaUseCase,
        useFactory: (marcaRepository: MarcaRepository) => new CrearMarcaUseCase(marcaRepository),
        inject: [MarcaRepository]
    },
    {
        provide: EliminarMarcaUseCase,
        useFactory: (marcaRepository: MarcaRepository) => new EliminarMarcaUseCase(marcaRepository),
        inject: [MarcaRepository]
    },
    {
        provide: EditarMarcaUseCase,
        useFactory: (marcaRepository: MarcaRepository) => new EditarMarcaUseCase(marcaRepository),
        inject: [MarcaRepository]
    },
    {
        provide: ConsultarMarcasUseCase,
        useFactory: (marcaReadRepository: MarcaReadRepository) => new ConsultarMarcasUseCase(marcaReadRepository),
        inject: [MarcaReadRepository]
    },
    {
        provide: ConsultarMarcaPorIdUseCase,
        useFactory: (marcaRepository: MarcaRepository) => new ConsultarMarcaPorIdUseCase(marcaRepository),
        inject: [MarcaRepository]
    }
]