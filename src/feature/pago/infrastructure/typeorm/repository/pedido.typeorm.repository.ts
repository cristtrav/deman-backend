import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Pedido } from "@feature/pago/domain/model/pedido";
import { PedidoRepository } from "@feature/pago/domain/repository/pedido.repository";
import { PedidoTypeORMModel } from "../model/pedido.typeorm.model";
import { PedidoTypeORMMapper } from "../mapper/pedido.typeorm.mapper";

export class PedidoTypeORMRepository implements PedidoRepository {

    constructor(
        @InjectRepository(PedidoTypeORMModel)
        private readonly pedidoTypeOrmRepository: Repository<PedidoTypeORMModel>
    ) { }

    async findById(id: number): Promise<Pedido | null> {
        const pedidoOrm = await this.pedidoTypeOrmRepository.findOne({ where: { id, eliminado: false } });
        return pedidoOrm ? PedidoTypeORMMapper.toDomain(pedidoOrm) : null;
    }
}
