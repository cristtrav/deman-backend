import { InjectRepository } from "@nestjs/typeorm";
import { PedidoTypeORMModel } from "../model/pedido.typeorm.model";
import { PedidoRepository } from "@feature/pedido/domain/repository/pedido.repository";
import { Repository } from "typeorm";
import { NewPedido } from "@feature/pedido/domain/model/new-pedido";
import { Pedido } from "@feature/pedido/domain/model/pedido";
import { PedidoTypeORMMapper } from "../mapper/pedido.typeorm.mapper";

export class PedidoTypeORMRepository implements PedidoRepository {
    constructor(
        @InjectRepository(PedidoTypeORMModel)
        private readonly pedidoTypeOrmRepository: Repository<PedidoTypeORMModel>
    ){}

    async findById(id: number): Promise<Pedido | null> {
        let pedidoOrm = await this.pedidoTypeOrmRepository.findOne({where: { id }});
        return pedidoOrm ? PedidoTypeORMMapper.toDomain(pedidoOrm) : null;
    }

    async create(pedido: NewPedido): Promise<Pedido> {
        const savedPedido = await this.pedidoTypeOrmRepository.save(PedidoTypeORMMapper.toORM(pedido));
        return PedidoTypeORMMapper.toDomain(savedPedido);
    }
    async update(pedido: Pedido): Promise<Pedido> {
        const savedPedido = await this.pedidoTypeOrmRepository.save(PedidoTypeORMMapper.toORM(pedido));
        return PedidoTypeORMMapper.toDomain(savedPedido);
    }
    async delete(id: number): Promise<void> {
        const pedidoOrm = await this.pedidoTypeOrmRepository.findOne({where: { id }});
        if(!pedidoOrm) throw new Error("Pedido no encontrado");
        pedidoOrm.eliminado = true;
        await this.pedidoTypeOrmRepository.save(pedidoOrm);        
    }
}
