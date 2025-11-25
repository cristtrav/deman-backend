import { Provider } from "@nestjs/common";
import { InventarioReadRepository } from "../../application/read-repository/inventario.read-repository";
import { InventarioTypeORMReadRepository } from "../typeorm/repository/inventario.typeorm.read-repository";

export default <Provider[]> [
    {
        provide: InventarioReadRepository,
        useClass: InventarioTypeORMReadRepository
    }
]