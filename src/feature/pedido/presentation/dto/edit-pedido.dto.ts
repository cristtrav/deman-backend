export class EditPedidoDTO {
    clienteId: number;
    fechaPedido: string;
    fechaEntrega: string;
    fechaEntregado?: string;
    descripcion: string;    
    total: number;
}