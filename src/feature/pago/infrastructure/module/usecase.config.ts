import { PagoReadRepository } from "@feature/pago/application/read-repository/pago-read.repository";
import { ConsultarPagosPorPedidoUseCase } from "@feature/pago/application/usecase/consultar-pagos-por-pedido.usecase";
import { ConsultarPagosUseCase } from "@feature/pago/application/usecase/consultar-pagos.usecase";
import { CrearPagoUseCase } from "@feature/pago/application/usecase/crear-pago.usecase";
import { EditarPagoUseCase } from "@feature/pago/application/usecase/editar-pago.usecase";
import { EliminarPagoUseCase } from "@feature/pago/application/usecase/eliminar-pago.usecase";
import { PagoRepository } from "@feature/pago/domain/repository/pago.repository";
import { PedidoRepository } from "@feature/pago/domain/repository/pedido.repository";
import { Provider } from "@nestjs/common";

export default <Provider[]>[
    {
        provide: ConsultarPagosUseCase,
        useFactory: (pagoReadRepository: PagoReadRepository) => new ConsultarPagosUseCase(pagoReadRepository),
        inject: [PagoReadRepository]
    },
    {
        provide: ConsultarPagosPorPedidoUseCase,
        useFactory: (
            pagoReadRepository: PagoReadRepository,
            pedidoRepository: PedidoRepository
        ) => new ConsultarPagosPorPedidoUseCase(pagoReadRepository, pedidoRepository),
        inject: [PagoReadRepository, PedidoRepository]
    },
    {
        provide: CrearPagoUseCase,
        useFactory: (
            pagoRepository: PagoRepository,
            pedidoRepository: PedidoRepository
        ) => new CrearPagoUseCase(pagoRepository, pedidoRepository),
        inject: [PagoRepository, PedidoRepository]
    },
    {
        provide: EditarPagoUseCase,
        useFactory: (
            pagoRepository: PagoRepository,
            pedidoRepository: PedidoRepository
        ) => new EditarPagoUseCase(pagoRepository, pedidoRepository),
        inject: [PagoRepository, PedidoRepository]
    },
    {
        provide: EliminarPagoUseCase,
        useFactory: (
            pagoRepository: PagoRepository,
            pedidoRepository: PedidoRepository
        ) => new EliminarPagoUseCase(pagoRepository, pedidoRepository),
        inject: [PagoRepository, PedidoRepository]
    }
]
