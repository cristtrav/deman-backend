import { Provider } from "@nestjs/common";
import { UnidadMedidaTypeORMReadRepository } from "../typeorm/repository/unidad-medida.typeorm.read-repository";
import { UnidadMedidaReadRepository } from "@feature/unidad-medida/application/repository/unidad-medida.read-repository";

export default <Provider[]> [
    {
        provide: UnidadMedidaReadRepository,
        useClass: UnidadMedidaTypeORMReadRepository
    }
]