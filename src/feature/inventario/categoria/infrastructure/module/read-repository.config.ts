import { Provider } from "@nestjs/common";
import { CategoriaReadRepository } from "../../application/read-repository/categoria.read-repository";
import { CategoriaTypeORMReadRepository } from "../typeorm/repository/categoria.typeorm.read-repository";

export default <Provider[]> [
    {
        provide: CategoriaReadRepository,
        useClass: CategoriaTypeORMReadRepository
    }
]