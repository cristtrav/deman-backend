import { Pedido } from "@feature/pedido/domain/model/pedido";
import { PedidoData } from "../contract/data/pedido.data";
import { NewPedidoDTO } from "@feature/pedido/presentation/dto/new-pedido.dto";
import { CrearPedidoData } from "../contract/data/crear-pedido.data";
import { ClienteDataMapper } from "./cliente-data.mapper";
import { EditarPedidoData } from "../contract/data/editar-pedido.data";
import { Cliente } from "@feature/pedido/domain/model/cliente";

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
            saldo: pedido.saldo,
            descripcion: pedido.descripcion,
            tienePagos: pedido.tienePagos
        };
        return pedidoData;
    }

}