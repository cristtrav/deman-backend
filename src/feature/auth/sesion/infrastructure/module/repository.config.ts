import { Provider } from "@nestjs/common";
import { AdministradorInicialRepository } from "../../application/repository/administrador-inicial.repository";
import { AdministradorInicialTypeORMRepository } from "../typeorm/repository/administrador-inicial.typeorm.repository";

export default <Provider[]>[
    {
        provide: AdministradorInicialRepository,
        useClass: AdministradorInicialTypeORMRepository
    }
]
