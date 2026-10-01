import { PedidoData } from "@feature/pedido/application/contract/data/pedido.data";
import { PedidoDTO } from "../dto/pedido.dto";
import { CrearPedidoData } from "@feature/pedido/application/contract/data/crear-pedido.data";
import { NewPedidoDTO } from "../dto/new-pedido.dto";
import { EditPedidoDTO } from "../dto/edit-pedido.dto";
import { EditarPedidoData } from "@feature/pedido/application/contract/data/editar-pedido.data";

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
        pedidoDTO.saldo = pedido.saldo;
        return pedidoDTO;
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

    static toEditarData(dto: EditPedidoDTO): EditarPedidoData{
        return {
            clienteId: dto.clienteId,
            fechaPedido: dto.fechaPedido,
            fechaEntrega: dto.fechaEntrega,
            fechaEntregado: dto.fechaEntregado,
            total: dto.total,
            descripcion: dto.descripcion
        }
    }
}