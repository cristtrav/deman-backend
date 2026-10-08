import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { TypeORMTransactionContext } from "@core/infrastructure/typeorm/transaction/typeorm-transaction.context";
import { Pedido } from "@feature/pago/domain/model/pedido";
import { PedidoRepository } from "@feature/pago/domain/repository/pedido.repository";
import { PedidoTypeORMModel } from "../model/pedido.typeorm.model";
import { PedidoTypeORMMapper } from "../mapper/pedido.typeorm.mapper";

export class PedidoTypeORMRepository implements PedidoRepository {

    constructor(
        @InjectRepository(PedidoTypeORMModel)
        private readonly pedidoTypeOrmRepository: Repository<PedidoTypeORMModel>
    ) { }

    private get repository(): Repository<PedidoTypeORMModel> {
        return TypeORMTransactionContext.repository(this.pedidoTypeOrmRepository);
    }

    async findById(id: number): Promise<Pedido | null> {
        const pedidoOrm = await this.repository.findOne({ where: { id, eliminado: false } });
        return pedidoOrm ? PedidoTypeORMMapper.toDomain(pedidoOrm) : null;
    }

    async findByIdForUpdate(id: number): Promise<Pedido | null> {
        // El bloqueo se toma sobre la fila del pedido sola: Postgres no permite FOR UPDATE
        // sobre el lado opcional del LEFT JOIN que genera la relación eager con cliente.
        const pedidoBloqueado = await this.repository.createQueryBuilder('pedido')
            .select('pedido.id')
            .where('pedido.id = :id AND pedido.eliminado = false', { id })
            .setLock('pessimistic_write')
            .getOne();
        return pedidoBloqueado ? this.findById(id) : null;
    }

    async actualizarSaldo(pedido: Pedido): Promise<void> {
        await this.repository.update({ id: pedido.id }, { saldo: pedido.saldo });
    }
}
