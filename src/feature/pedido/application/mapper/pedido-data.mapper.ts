import { Pedido } from "@feature/pedido/domain/model/pedido";
import { PedidoData } from "../contract/data/pedido.data";
import { NewPedidoDTO } from "@feature/pedido/presentation/dto/new-pedido.dto";
import { CrearPedidoData } from "../contract/data/crear-pedido.data";
import { ClienteDataMapper } from "./cliente-data.mapper";

export class PedidoDataMapper {
    static toData(pedido: Pedido): PedidoData {
        const pedidoData: PedidoData = {
            id: pedido.id,
            fechaPedido: pedido.fechaPedido.toString(),
            fechaConfirmacion: pedido.fechaConfirmacion?.toString(),
            fechaEntrega: pedido.fechaEntrega.toString(),
            fechaEntregado: pedido.fechaEntregado?.toString(),
            confirmado: pedido.confirmado,
            entregado: pedido.entregado,
            cliente: ClienteDataMapper.toData(pedido.cliente),
            total: pedido.total,
            descripcion: pedido.descripcion
        };
        return pedidoData;
    }

    static toCrearData(newPedidoDto: NewPedidoDTO): CrearPedidoData {
        return {
            fechaPedido: newPedidoDto.fechaPedido.toString(),
            fechaConfirmacion: newPedidoDto.fechaPedido.toString(),
            fechaEntrega: newPedidoDto.fechaEntrega.toString(),
            confirmado: true,
            entregado: true,
            clienteId: newPedidoDto.clienteId,
            total: newPedidoDto.total,
            descripcion: newPedidoDto.descripcion
        };
    }
}