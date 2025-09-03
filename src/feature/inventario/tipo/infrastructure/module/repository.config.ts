import { Provider } from "@nestjs/common";
import { TipoTypeORMRepository } from "../typeorm/repository/tipo.typeorm.repository";
import { TipoRepository } from "../../domain/repository/tipo.repository";

export default <Provider[]>[
    {
        provide: TipoRepository,
        useClass: TipoTypeORMRepository
    },
]