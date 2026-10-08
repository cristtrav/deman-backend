import { Pedido } from "@feature/pago/domain/model/pedido";
import { PedidoTypeORMModel } from "../model/pedido.typeorm.model";
import { ClienteTypeORMMapper } from "./cliente.typeorm.mapper";

export class PedidoTypeORMMapper {
    static toDomain(pedidoOrm: PedidoTypeORMModel): Pedido {
        return new Pedido(
            pedidoOrm.id,
            ClienteTypeORMMapper.toDomain(pedidoOrm.cliente),
            pedidoOrm.total,
            pedidoOrm.saldo
        );
    }

    static toORM(pedido: Pedido): PedidoTypeORMModel {
        const pedidoOrm = new PedidoTypeORMModel();
        pedidoOrm.id = pedido.id;
        pedidoOrm.cliente = ClienteTypeORMMapper.toORM(pedido.cliente);
        pedidoOrm.total = pedido.total;
        pedidoOrm.saldo = pedido.saldo;
        return pedidoOrm;
    }
}
