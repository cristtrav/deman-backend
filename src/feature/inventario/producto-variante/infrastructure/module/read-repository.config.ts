import { Provider } from "@nestjs/common";
import { ProductoVarianteTypeORMModel } from "../typeorm/model/producto-variante.typeorm.model";
import { ProductoVarianteReadRepository } from "@feature/inventario/producto-variante/application/read-repository/producto-variante.read-repository";
import { ProductoVarianteTypeORMReadRepository } from "../typeorm/repository/producto-variante.typeorm.read-repository";

export default <Provider[]> [
    {
        provide: ProductoVarianteReadRepository,
        useClass: ProductoVarianteTypeORMReadRepository,
    }
]