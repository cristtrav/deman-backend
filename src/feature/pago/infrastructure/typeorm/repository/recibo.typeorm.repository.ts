import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { TypeORMTransactionContext } from "@core/infrastructure/typeorm/transaction/typeorm-transaction.context";
import { NewRecibo } from "@feature/pago/domain/model/new-recibo";
import { Recibo } from "@feature/pago/domain/model/recibo";
import { ReciboRepository } from "@feature/pago/domain/repository/recibo.repository";
import { ReciboTypeORMModel } from "../model/recibo.typeorm.model";
import { ReciboTypeORMMapper } from "../mapper/recibo.typeorm.mapper";

export class ReciboTypeORMRepository implements ReciboRepository {

    constructor(
        @InjectRepository(ReciboTypeORMModel)
        private readonly reciboTypeOrmRepository: Repository<ReciboTypeORMModel>
    ) { }

    private get repository(): Repository<ReciboTypeORMModel> {
        return TypeORMTransactionContext.repository(this.reciboTypeOrmRepository);
    }

    async findByPago(pagoId: number): Promise<Recibo | null> {
        const reciboOrm = await this.repository.findOne({ where: { pagoId } });
        return reciboOrm ? ReciboTypeORMMapper.toDomain(reciboOrm) : null;
    }

    async create(recibo: NewRecibo): Promise<Recibo> {
        const savedRecibo = await this.repository.save(ReciboTypeORMMapper.toORM(recibo));
        return ReciboTypeORMMapper.toDomain(savedRecibo);
    }

    async update(recibo: Recibo): Promise<Recibo> {
        const savedRecibo = await this.repository.save(ReciboTypeORMMapper.toORM(recibo));
        return ReciboTypeORMMapper.toDomain(savedRecibo);
    }
}
