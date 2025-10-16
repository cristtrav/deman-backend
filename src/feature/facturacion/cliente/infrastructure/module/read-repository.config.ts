import { Provider } from "@nestjs/common";
import { ClienteReadRepository } from "../../application/read/repository/cliente.read-repository";
import { ClienteReadTypeORMRepository } from "../typeorm/repository/cliente.typeorm.read-repository";

export default <Provider[]>[
    {
        provide: ClienteReadRepository,
        useClass: ClienteReadTypeORMRepository
    }
]