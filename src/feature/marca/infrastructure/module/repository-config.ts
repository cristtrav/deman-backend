import { Provider } from "@nestjs/common";
import { MarcaTypeORMRepository } from "../typeorm/repository/marca.typeorm.repository";
import { MarcaRepository } from "@feature/marca/domain/repository/marca.repository";

export default <Provider[]>[
    {
        provide: MarcaRepository,
        useClass: MarcaTypeORMRepository
    },
]