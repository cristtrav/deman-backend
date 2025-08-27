import { Provider } from "@nestjs/common";
import { TipoReadRepository } from "../../application/repository/tipo.read-repository";
import { TipoTypeORMReadRepository } from "../typeorm/repository/tipo.typeorm.read-repository";

export default <Provider[]>[
    {
        provide: TipoReadRepository,
        useClass: TipoTypeORMReadRepository
    }
]