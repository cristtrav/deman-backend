import { Provider } from "@nestjs/common";
import { MarcaRepository } from "src/marca/domain/repository/marca.repository";
import { MarcaTypeORMRepository } from "../typeorm/repository/marca.typeorm.repository";

export default <Provider[]>[
    {
        provide: MarcaRepository,
        useClass: MarcaTypeORMRepository
    },
]