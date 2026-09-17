import { PedidoData } from "@feature/pedido/application/contract/data/pedido.data";
import { PedidoDTO } from "../dto/pedido.dto";

export class PedidoDTOMapper {
    static toDTO(pedido: PedidoData): PedidoDTO {
        const pedidoDTO = new PedidoDTO();
        pedidoDTO.id = pedido.id;
        pedidoDTO.cliente = {
            id: pedido.cliente.id,
            razonSocial: pedido.cliente.razonSocial
        };
        pedidoDTO.fechaPedido = pedido.fechaPedido;
        pedidoDTO.fechaConfirmacion = pedido.fechaConfirmacion;
        pedidoDTO.fechaEntrega = pedido.fechaEntrega;
        pedidoDTO.fechaEntregado = pedido.fechaEntregado;
        pedidoDTO.confirmado = pedido.confirmado;
        pedidoDTO.entregado = pedido.entregado;
        pedidoDTO.descripcion = pedido.descripcion;
        pedidoDTO.total = pedido.total;
        return pedidoDTO;
    }
}