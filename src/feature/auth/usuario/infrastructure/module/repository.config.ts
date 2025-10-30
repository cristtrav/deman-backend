import { Provider } from "@nestjs/common";
import { UsuarioRepository } from "../../domain/repository/usuario.repository";
import { UsuarioTypeORMRepository } from "../typeorm/repository/usuario.typeorm.repository";

export default <Provider[]>[
    {
        provide: UsuarioRepository,
        useClass: UsuarioTypeORMRepository
    },
]