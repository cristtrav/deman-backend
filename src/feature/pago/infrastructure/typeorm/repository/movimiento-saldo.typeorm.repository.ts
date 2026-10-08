import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { TypeORMTransactionContext } from "@core/infrastructure/typeorm/transaction/typeorm-transaction.context";
import { NewMovimientoSaldo } from "@feature/pago/domain/model/new-movimiento-saldo";
import { MovimientoSaldoRepository } from "@feature/pago/domain/repository/movimiento-saldo.repository";
import { MovimientoSaldoTypeORMModel } from "../model/movimiento-saldo.typeorm.model";
import { MovimientoSaldoTypeORMMapper } from "../mapper/movimiento-saldo.typeorm.mapper";

export class MovimientoSaldoTypeORMRepository implements MovimientoSaldoRepository {

    constructor(
        @InjectRepository(MovimientoSaldoTypeORMModel)
        private readonly movimientoTypeOrmRepository: Repository<MovimientoSaldoTypeORMModel>
    ) { }

    async create(movimiento: NewMovimientoSaldo): Promise<void> {
        const repository = TypeORMTransactionContext.repository(this.movimientoTypeOrmRepository);
        await repository.insert(MovimientoSaldoTypeORMMapper.toORM(movimiento));
    }
}
