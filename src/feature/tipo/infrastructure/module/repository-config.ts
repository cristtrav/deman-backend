import { Provider } from "@nestjs/common";
import { TipoRepository } from "@feature/tipo/domain/repository/tipo.repository";
import { TipoTypeORMRepository } from "../typeorm/repository/tipo.typeorm.repository";

export default <Provider[]>[
    {
        provide: TipoRepository,
        useClass: TipoTypeORMRepository
    },
]