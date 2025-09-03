import { Provider } from "@nestjs/common";
import { ProductoReadRepository } from "../../application/read/repository/producto.read-repository";
import { ProductoReadTypeORMRepository } from "../typeorm/repository/producto.typeorm.read-repository";

export default <Provider[]>[
    {
        provide: ProductoReadRepository,
        useClass: ProductoReadTypeORMRepository
    }
]