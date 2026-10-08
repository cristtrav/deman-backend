import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { TypeORMTransactionContext } from "@core/infrastructure/typeorm/transaction/typeorm-transaction.context";
import { Empresa } from "@feature/pago/domain/model/empresa";
import { EmpresaRepository } from "@feature/pago/domain/repository/empresa.repository";
import { EmpresaTypeORMModel } from "../model/empresa.typeorm.model";
import { EmpresaTypeORMMapper } from "../mapper/empresa.typeorm.mapper";

export class EmpresaTypeORMRepository implements EmpresaRepository {

    constructor(
        @InjectRepository(EmpresaTypeORMModel)
        private readonly empresaTypeOrmRepository: Repository<EmpresaTypeORMModel>
    ) { }

    async obtener(): Promise<Empresa | null> {
        const empresaOrm = await TypeORMTransactionContext.repository(this.empresaTypeOrmRepository)
            .findOneBy({ id: EmpresaTypeORMModel.ID });
        return empresaOrm ? EmpresaTypeORMMapper.toDomain(empresaOrm) : null;
    }
}
