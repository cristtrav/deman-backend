import { PedidoReadRepository } from "@feature/pedido/application/read-repository/pedido-read.repository";
import { ConsultarPedidoPorIdUseCase } from "@feature/pedido/application/usecase/consultar-pedido-por-id.usecase";
import { ConsultarPedidosUseCase } from "@feature/pedido/application/usecase/consultar-pedidos-usecase";
import { CrearPedidoUseCase } from "@feature/pedido/application/usecase/crear-pedido.usecase";
import { EditarPedidoUseCase } from "@feature/pedido/application/usecase/editar-pedido.usecase";
import { ClienteRepository } from "@feature/pedido/domain/repository/cliente.repository";
import { PedidoRepository } from "@feature/pedido/domain/repository/pedido.repository";
import { Provider } from "@nestjs/common";

export default <Provider[]>[
    {
        provide: CrearPedidoUseCase,
        useFactory: (
            pedidoRepository: PedidoRepository,
            clienteRepository: ClienteRepository
        ) => new CrearPedidoUseCase(pedidoRepository, clienteRepository),
        inject: [PedidoRepository, ClienteRepository]
    },
    {
        provide: ConsultarPedidoPorIdUseCase,
        useFactory: (pedidoRepository: PedidoRepository) => new ConsultarPedidoPorIdUseCase(pedidoRepository),
        inject: [PedidoRepository]
    },
    {
        provide: ConsultarPedidosUseCase,
        useFactory: (pedidoReadRepository: PedidoReadRepository) => new ConsultarPedidosUseCase(pedidoReadRepository),
        inject: [PedidoReadRepository]
    },
    {
        provide: EditarPedidoUseCase,
        useFactory: (
            pedidoRepository: PedidoRepository,
            clienteRepository: ClienteRepository
        ) => new EditarPedidoUseCase(pedidoRepository, clienteRepository),
        inject: [PedidoRepository, ClienteRepository]
    }
]