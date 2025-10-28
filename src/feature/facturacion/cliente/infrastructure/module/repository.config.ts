import { Provider } from "@nestjs/common";
import { ClienteRepository } from "../../domain/repository/cliente.repository";
import { ClienteTypeORMRepository } from "../typeorm/repository/cliente.typeorm.repository";

export default <Provider[]>[
    {
        provide: ClienteRepository,
        useClass: ClienteTypeORMRepository
    },
]