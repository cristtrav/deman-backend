import { Provider } from "@nestjs/common";
import { ColorRepository } from "@feature/inventario/color/domain/repository/color.repository";
import { ColorTypeORMRepository } from "../typeorm/repository/color.typeorm.repository";

export default <Provider[]>[
    {
        provide: ColorRepository,
        useClass: ColorTypeORMRepository
    },
]