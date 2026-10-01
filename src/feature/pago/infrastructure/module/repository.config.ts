import { PagoRepository } from "@feature/pago/domain/repository/pago.repository";
import { PedidoRepository } from "@feature/pago/domain/repository/pedido.repository";
import { Provider } from "@nestjs/common";
import { PagoTypeORMRepository } from "../typeorm/repository/pago.typeorm.repository";
import { PedidoTypeORMRepository } from "../typeorm/repository/pedido.typeorm.repository";

export default <Provider[]>[
    {
        provide: PagoRepository,
        useClass: PagoTypeORMRepository
    },
    {
        provide: PedidoRepository,
        useClass: PedidoTypeORMRepository
    }
]
