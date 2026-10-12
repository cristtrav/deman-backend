import { Provider } from "@nestjs/common";
import { CredencialReadRepository } from "../../application/read-repository/credencial.read-repository";
import { CredencialReadTypeORMRepository } from "../typeorm/repository/credencial.typeorm.read-repository";

export default <Provider[]>[
    {
        provide: CredencialReadRepository,
        useClass: CredencialReadTypeORMRepository
    }
]
