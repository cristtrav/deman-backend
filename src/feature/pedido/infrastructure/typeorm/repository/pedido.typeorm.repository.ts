import { InjectRepository } from "@nestjs/typeorm";
import { PedidoTypeORMModel } from "../model/pedido.typeorm.model";
import { PedidoRepository } from "@feature/pedido/domain/repository/pedido.repository";
import { Repository } from "typeorm";
import { NewPedido } from "@feature/pedido/domain/model/new-pedido";
import { Pedido } from "@feature/pedido/domain/model/pedido";
import { PedidoTypeORMMapper } from "../mapper/pedido.typeorm.mapper";
import { TypeORMTransactionContext } from "@core/infrastructure/typeorm/transaction/typeorm-transaction.context";

export class PedidoTypeORMRepository implements PedidoRepository {
    constructor(
        @InjectRepository(PedidoTypeORMModel)
        private readonly pedidoTypeOrmRepository: Repository<PedidoTypeORMModel>
    ){}

    private get repository(): Repository<PedidoTypeORMModel> {
        return TypeORMTransactionContext.repository(this.pedidoTypeOrmRepository);
    }

    async findById(id: number): Promise<Pedido | null> {
        let pedidoOrm = await this.repository.findOne({where: { id, eliminado: false }});
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

    async create(pedido: NewPedido): Promise<Pedido> {
        const savedPedido = await this.repository.save(PedidoTypeORMMapper.toORM(pedido));
        return PedidoTypeORMMapper.toDomain(savedPedido);
    }
    async update(pedido: Pedido): Promise<Pedido> {
        await this.repository.save(PedidoTypeORMMapper.toORM(pedido));
        // Se vuelve a leer para obtener los campos calculados (tienePagos)
        const updatedPedido = await this.findById(pedido.id);
        if(!updatedPedido) throw new Error("Pedido no encontrado");
        return updatedPedido;
    }
    async delete(id: number): Promise<void> {
        const pedidoOrm = await this.repository.findOne({where: { id }});
        if(!pedidoOrm) throw new Error("Pedido no encontrado");
        pedidoOrm.eliminado = true;
        await this.repository.save(pedidoOrm);        
    }
}
