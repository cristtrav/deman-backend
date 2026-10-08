import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { TypeORMTransactionContext } from "@core/infrastructure/typeorm/transaction/typeorm-transaction.context";
import { Empresa } from "@feature/empresa/domain/model/empresa";
import { EmpresaRepository } from "@feature/empresa/domain/repository/empresa.repository";
import { EmpresaTypeORMModel } from "../model/empresa.typeorm.model";
import { EmpresaTypeORMMapper } from "../mapper/empresa.typeorm.mapper";

export class EmpresaTypeORMRepository implements EmpresaRepository {

    constructor(
        @InjectRepository(EmpresaTypeORMModel)
        private readonly empresaTypeOrmRepository: Repository<EmpresaTypeORMModel>
    ) { }

    private get repository(): Repository<EmpresaTypeORMModel> {
        return TypeORMTransactionContext.repository(this.empresaTypeOrmRepository);
    }

    async obtener(): Promise<Empresa | null> {
        const empresaOrm = await this.repository.findOneBy({ id: EmpresaTypeORMModel.ID });
        return empresaOrm ? EmpresaTypeORMMapper.toDomain(empresaOrm) : null;
    }

    async guardar(empresa: Empresa): Promise<Empresa> {
        // INSERT ... ON CONFLICT: dos registros simultáneos de la empresa no chocan por la clave
        await this.repository.upsert(EmpresaTypeORMMapper.toORM(empresa), ['id']);
        const guardada = await this.obtener();
        if(guardada == null) throw new Error("No se pudieron guardar los datos de la empresa");
        return guardada;
    }
}
