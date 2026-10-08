import { InjectRepository } from "@nestjs/typeorm";
import { IsNull, Repository } from "typeorm";
import { TypeORMTransactionContext } from "@core/infrastructure/typeorm/transaction/typeorm-transaction.context";
import { Empresa } from "@feature/empresa/domain/model/empresa";
import { ReciboEmpresaRepository } from "@feature/empresa/domain/repository/recibo-empresa.repository";
import { ReciboEmpresaTypeORMModel } from "../model/recibo-empresa.typeorm.model";

export class ReciboEmpresaTypeORMRepository implements ReciboEmpresaRepository {

    constructor(
        @InjectRepository(ReciboEmpresaTypeORMModel)
        private readonly reciboTypeOrmRepository: Repository<ReciboEmpresaTypeORMModel>
    ) { }

    async completarRecibosSinEmpresa(empresa: Empresa): Promise<number> {
        const result = await TypeORMTransactionContext.repository(this.reciboTypeOrmRepository).update(
            { empresaNombre: IsNull() },
            {
                empresaNombre: empresa.nombre,
                empresaDireccion: empresa.direccion ?? null,
                empresaRuc: empresa.ruc ?? null,
                empresaTelefono: empresa.telefono ?? null
            }
        );
        return result.affected ?? 0;
    }
}
