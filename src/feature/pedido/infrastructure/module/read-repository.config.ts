import { PedidoReadRepository } from "@feature/pedido/application/read-repository/pedido-read.repository";
import { Provider } from "@nestjs/common";
import { PedidoTypeORMReadRepository } from "../typeorm/repository/pedido.typeorm.read-repository";

export default <Provider[]>[
    {
        provide: PedidoReadRepository,
        useClass: PedidoTypeORMReadRepository
    }
]