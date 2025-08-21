import { Provider } from "@nestjs/common";
import { CategoriaRepository } from "../../domain/repository/categoria.repository";
import { CategoriaTypeORMRepository } from "../typeorm/repository/categoria.typeorm.repository";

export default <Provider[]> [
    {
        provide: CategoriaRepository,
        useClass: CategoriaTypeORMRepository
    }
]