import { Provider } from "@nestjs/common";
import { UsuarioReadRepository } from "../../application/read-repository/usuario.read-repository";
import { UsuarioReadTypeORMRepository } from "../typeorm/repository/usuario.typeorm.read-repository";

export default <Provider[]>[
    {
        provide: UsuarioReadRepository,
        useClass: UsuarioReadTypeORMRepository
    }
]