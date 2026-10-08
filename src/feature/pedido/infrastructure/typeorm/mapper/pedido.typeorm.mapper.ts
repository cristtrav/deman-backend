import { Pedido } from "@feature/pedido/domain/model/pedido";
import { Temporal } from "@js-temporal/polyfill";
import { PedidoTypeORMModel } from "../model/pedido.typeorm.model";
import { ClienteTypeORMMapper } from "./cliente.typeorm.mapper";
import { NewPedido } from "@feature/pedido/domain/model/new-pedido";
import { PedidoData } from "@feature/pedido/application/contract/data/pedido.data";

export class PedidoTypeORMMapper {
    static toDomain(pedidoOrm: PedidoTypeORMModel): Pedido {
        return new Pedido(
            pedidoOrm.id,
            Temporal.PlainDate.from(pedidoOrm.fechaPedido),
            Temporal.PlainDate.from(pedidoOrm.fechaConfirmacion),
            Temporal.PlainDate.from(pedidoOrm.fechaEntrega),
            pedidoOrm.fechaEntregado ? Temporal.PlainDate.from(pedidoOrm.fechaEntregado) : undefined,
            pedidoOrm.confirmado,
            pedidoOrm.entregado,
            ClienteTypeORMMapper.toDomain(pedidoOrm.cliente),
            pedidoOrm.total,
            pedidoOrm.descripcion,
            pedidoOrm.saldo,
            pedidoOrm.tienePagos ?? false
        );
    }

    static toORM(pedido: NewPedido | Pedido): PedidoTypeORMModel {
        if ('id' in pedido) return this.toExistingORM(pedido);
        return this.toNewORM(pedido);
    }

    private static toNewORM(pedido: NewPedido): PedidoTypeORMModel {
        const pedidoOrm = new PedidoTypeORMModel();
        pedidoOrm.fechaPedido = pedido.fechaPedido.toString();
        pedidoOrm.fechaConfirmacion = pedido.fechaConfirmacion.toString();
        pedidoOrm.fechaEntrega = pedido.fechaEntrega.toString();
        pedidoOrm.confirmado = pedido.confirmado;
        pedidoOrm.entregado = pedido.entregado;
        pedidoOrm.cliente = ClienteTypeORMMapper.toORM(pedido.cliente);
        pedidoOrm.total = pedido.total;
        pedidoOrm.saldo = pedido.saldo;
        pedidoOrm.descripcion = pedido.descripcion;
        return pedidoOrm;
    }

    private static toExistingORM(pedido: Pedido): PedidoTypeORMModel {
        const pedidoOrm = new PedidoTypeORMModel();
        pedidoOrm.id = pedido.id;
        pedidoOrm.fechaPedido = pedido.fechaPedido.toString();
        pedidoOrm.fechaConfirmacion = pedido.fechaConfirmacion.toString();
        pedidoOrm.fechaEntrega = pedido.fechaEntrega.toString();
        pedidoOrm.fechaEntregado = pedido.fechaEntregado?.toString() ?? null;
        pedidoOrm.confirmado = pedido.confirmado;
        pedidoOrm.entregado = pedido.entregado;
        pedidoOrm.cliente = ClienteTypeORMMapper.toORM(pedido.cliente);
        pedidoOrm.total = pedido.total;
        pedidoOrm.saldo = pedido.saldo;
        pedidoOrm.descripcion = pedido.descripcion;
        return pedidoOrm;
    }

    static toData(pedidoOrm: PedidoTypeORMModel): PedidoData {
        return {
            id: pedidoOrm.id,
            fechaPedido: pedidoOrm.fechaPedido,
            fechaConfirmacion: pedidoOrm.fechaConfirmacion,
            fechaEntrega: pedidoOrm.fechaEntrega,
            fechaEntregado: pedidoOrm.fechaEntregado ?? undefined,
            confirmado: pedidoOrm.confirmado,
            entregado: pedidoOrm.entregado,
            cliente: ClienteTypeORMMapper.toData(pedidoOrm.cliente),
            total: pedidoOrm.total,
            saldo: pedidoOrm.saldo,
            descripcion: pedidoOrm.descripcion,
            tienePagos: pedidoOrm.tienePagos ?? false
        };
    }
}