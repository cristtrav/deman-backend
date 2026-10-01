import { PagoReadRepository } from "@feature/pago/application/read-repository/pago-read.repository";
import { Provider } from "@nestjs/common";
import { PagoTypeORMReadRepository } from "../typeorm/repository/pago.typeorm.read-repository";

export default <Provider[]>[
    {
        provide: PagoReadRepository,
        useClass: PagoTypeORMReadRepository
    }
]
