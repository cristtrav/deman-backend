import { ClienteRepository } from "@feature/pedido/domain/repository/cliente.repository";
import { PedidoRepository } from "@feature/pedido/domain/repository/pedido.repository";
import { Provider } from "@nestjs/common";
import { ClienteTypeORMRepository } from "../typeorm/repository/cliente.typeorm.repository";
import { PedidoTypeORMRepository } from "../typeorm/repository/pedido.typeorm.repository";

export default <Provider[]>[
    {
        provide: PedidoRepository,
        useClass: PedidoTypeORMRepository
    },
    {
        provide: ClienteRepository,
        useClass: ClienteTypeORMRepository
    }
]   