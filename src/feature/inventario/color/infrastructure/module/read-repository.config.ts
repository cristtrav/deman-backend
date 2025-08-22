import { Provider } from "@nestjs/common";
import { ColorReadRepository } from "../../application/read-repository/color.read-repository";
import { ColorTypeORMReadRepository } from "../typeorm/repository/color.typeorm.read-repository";

export default <Provider[]>[
    {
        provide: ColorReadRepository,
        useClass: ColorTypeORMReadRepository
    }
]