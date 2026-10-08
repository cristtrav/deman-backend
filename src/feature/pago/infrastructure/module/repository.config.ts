import { PagoRepository } from "@feature/pago/domain/repository/pago.repository";
import { PedidoRepository } from "@feature/pago/domain/repository/pedido.repository";
import { ReciboRepository } from "@feature/pago/domain/repository/recibo.repository";
import { MovimientoSaldoRepository } from "@feature/pago/domain/repository/movimiento-saldo.repository";
import { NumeracionReciboRepository } from "@feature/pago/domain/repository/numeracion-recibo.repository";
import { EmpresaRepository } from "@feature/pago/domain/repository/empresa.repository";
import { Provider } from "@nestjs/common";
import { PagoTypeORMRepository } from "../typeorm/repository/pago.typeorm.repository";
import { PedidoTypeORMRepository } from "../typeorm/repository/pedido.typeorm.repository";
import { ReciboTypeORMRepository } from "../typeorm/repository/recibo.typeorm.repository";
import { MovimientoSaldoTypeORMRepository } from "../typeorm/repository/movimiento-saldo.typeorm.repository";
import { NumeracionReciboTypeORMRepository } from "../typeorm/repository/numeracion-recibo.typeorm.repository";
import { EmpresaTypeORMRepository } from "../typeorm/repository/empresa.typeorm.repository";

export default <Provider[]>[
    {
        provide: PagoRepository,
        useClass: PagoTypeORMRepository
    },
    {
        provide: PedidoRepository,
        useClass: PedidoTypeORMRepository
    },
    {
        provide: ReciboRepository,
        useClass: ReciboTypeORMRepository
    },
    {
        provide: MovimientoSaldoRepository,
        useClass: MovimientoSaldoTypeORMRepository
    },
    {
        provide: NumeracionReciboRepository,
        useClass: NumeracionReciboTypeORMRepository
    },
    {
        provide: EmpresaRepository,
        useClass: EmpresaTypeORMRepository
    }
]
