import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { TypeORMTransactionContext } from "@core/infrastructure/typeorm/transaction/typeorm-transaction.context";
import { NewPago } from "@feature/pago/domain/model/new-pago";
import { Pago } from "@feature/pago/domain/model/pago";
import { PagoRepository } from "@feature/pago/domain/repository/pago.repository";
import { PagoTypeORMModel } from "../model/pago.typeorm.model";
import { PagoTypeORMMapper } from "../mapper/pago.typeorm.mapper";

export class PagoTypeORMRepository implements PagoRepository {
    constructor(
        @InjectRepository(PagoTypeORMModel)
        private readonly pagoTypeOrmRepository: Repository<PagoTypeORMModel>
    ){}

    private get repository(): Repository<PagoTypeORMModel> {
        return TypeORMTransactionContext.repository(this.pagoTypeOrmRepository);
    }

    async findById(id: number): Promise<Pago | null> {
        const pagoOrm = await this.repository.findOne({where: { id, eliminado: false }});
        return pagoOrm ? PagoTypeORMMapper.toDomain(pagoOrm) : null;
    }

    async findByPedido(pedidoId: number): Promise<Pago[]> {
        const pagosOrm = await this.repository.find({where: { pedido: { id: pedidoId }, eliminado: false }});
        return pagosOrm.map(pagoOrm => PagoTypeORMMapper.toDomain(pagoOrm));
    }

    async create(pago: NewPago): Promise<Pago> {
        const savedPago = await this.repository.save(PagoTypeORMMapper.toORM(pago));
        return PagoTypeORMMapper.toDomain(savedPago);
    }

    async delete(id: number): Promise<void> {
        const result = await this.repository.update({ id, eliminado: false }, { eliminado: true });
        if(!result.affected) throw new Error("Pago no encontrado");
    }
}
