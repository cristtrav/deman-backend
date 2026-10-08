import { EmpresaRepository } from "@feature/empresa/domain/repository/empresa.repository";
import { ReciboEmpresaRepository } from "@feature/empresa/domain/repository/recibo-empresa.repository";
import { Provider } from "@nestjs/common";
import { EmpresaTypeORMRepository } from "../typeorm/repository/empresa.typeorm.repository";
import { ReciboEmpresaTypeORMRepository } from "../typeorm/repository/recibo-empresa.typeorm.repository";

export default <Provider[]>[
    {
        provide: EmpresaRepository,
        useClass: EmpresaTypeORMRepository
    },
    {
        provide: ReciboEmpresaRepository,
        useClass: ReciboEmpresaTypeORMRepository
    }
]
