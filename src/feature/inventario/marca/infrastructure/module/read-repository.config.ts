import { Provider } from "@nestjs/common";
import { MarcaReadRepository } from "../../application/read-repository/marca.read-repository";
import { MarcaTypeORMReadRepository } from "../typeorm/repository/marca.typeorm.read-repository";

export default <Provider[]>[
    {
        provide: MarcaReadRepository,
        useClass: MarcaTypeORMReadRepository
    },
]