import { Provider } from "@nestjs/common";
import { ConsultarClientesUseCase } from "../../application/usecase/consultar-clientes.usecase";
import { ClienteReadRepository } from "../../application/read/repository/cliente.read-repository";
import { ClienteRepository } from "../../domain/repository/cliente.repository";
import { CrearClienteUseCase } from "../../application/usecase/crear-cliente.usecase";
import { EditarClienteUseCase } from "../../application/usecase/editar-cliente.usecase";
import { EliminarClienteUseCase } from "../../application/usecase/eliminar-cliente.usecase";

export default <Provider[]>[
    {
        provide: ConsultarClientesUseCase,
        useFactory: (clienteReadRepository: ClienteReadRepository) => new ConsultarClientesUseCase(clienteReadRepository),
        inject: [ ClienteReadRepository ]
    },
    {
        provide: CrearClienteUseCase,
        useFactory: (clienteRepository: ClienteRepository) => new CrearClienteUseCase(clienteRepository),
        inject: [ClienteRepository]
    },
    {
        provide: EditarClienteUseCase,
        useFactory: (clienteRepository: ClienteRepository,) => new EditarClienteUseCase(clienteRepository,),
        inject: [ ClienteRepository,]
    },
    {
        provide: EliminarClienteUseCase,
        useFactory: (clienteRepository: ClienteRepository) => new EliminarClienteUseCase(clienteRepository),
        inject: [ ClienteRepository ]
    }
]