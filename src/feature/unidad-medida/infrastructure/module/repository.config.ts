import { UnidadMedidaRepository } from "@feature/unidad-medida/domain/repository/unidad-medida.repository";
import { Provider } from "@nestjs/common";
import { UnidadMedidaTypeORMRepository } from "../typeorm/repository/unidad-medida.typeorm.repository";

export default <Provider[]> [
    {
        provide: UnidadMedidaRepository,
        useClass: UnidadMedidaTypeORMRepository
    }
]