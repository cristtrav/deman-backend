import { TransactionManager } from "@core/application/transaction/transaction-manager";
import { PagoReadRepository } from "@feature/pago/application/read-repository/pago-read.repository";
import { ConsultarPagosPorPedidoUseCase } from "@feature/pago/application/usecase/consultar-pagos-por-pedido.usecase";
import { ConsultarPagosUseCase } from "@feature/pago/application/usecase/consultar-pagos.usecase";
import { CrearPagoUseCase } from "@feature/pago/application/usecase/crear-pago.usecase";
import { AnularPagoUseCase } from "@feature/pago/application/usecase/anular-pago.usecase";
import { PagoRepository } from "@feature/pago/domain/repository/pago.repository";
import { PedidoRepository } from "@feature/pago/domain/repository/pedido.repository";
import { ReciboRepository } from "@feature/pago/domain/repository/recibo.repository";
import { MovimientoSaldoRepository } from "@feature/pago/domain/repository/movimiento-saldo.repository";
import { NumeracionReciboRepository } from "@feature/pago/domain/repository/numeracion-recibo.repository";
import { EmpresaRepository } from "@feature/pago/domain/repository/empresa.repository";
import { Provider } from "@nestjs/common";
import { ReciboReadRepository } from "@feature/pago/application/read-repository/recibo-read.repository";
import { ConsultarReciboUseCase } from "@feature/pago/application/usecase/consultar-recibo.usecase";

export default <Provider[]>[
    {
        provide: ConsultarReciboUseCase,
        useFactory: (reciboReadRepository: ReciboReadRepository) => new ConsultarReciboUseCase(reciboReadRepository),
        inject: [ReciboReadRepository]
    },
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
            transactionManager: TransactionManager,
            pagoRepository: PagoRepository,
            pedidoRepository: PedidoRepository,
            reciboRepository: ReciboRepository,
            movimientoSaldoRepository: MovimientoSaldoRepository,
            numeracionReciboRepository: NumeracionReciboRepository,
            empresaRepository: EmpresaRepository
        ) => new CrearPagoUseCase(
            transactionManager,
            pagoRepository,
            pedidoRepository,
            reciboRepository,
            movimientoSaldoRepository,
            numeracionReciboRepository,
            empresaRepository
        ),
        inject: [
            TransactionManager,
            PagoRepository,
            PedidoRepository,
            ReciboRepository,
            MovimientoSaldoRepository,
            NumeracionReciboRepository,
            EmpresaRepository
        ]
    },
    {
        provide: AnularPagoUseCase,
        useFactory: (
            transactionManager: TransactionManager,
            pagoRepository: PagoRepository,
            pedidoRepository: PedidoRepository,
            reciboRepository: ReciboRepository,
            movimientoSaldoRepository: MovimientoSaldoRepository
        ) => new AnularPagoUseCase(
            transactionManager,
            pagoRepository,
            pedidoRepository,
            reciboRepository,
            movimientoSaldoRepository
        ),
        inject: [
            TransactionManager,
            PagoRepository,
            PedidoRepository,
            ReciboRepository,
            MovimientoSaldoRepository
        ]
    }
]
