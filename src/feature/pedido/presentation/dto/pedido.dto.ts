export class PedidoDTO {
    id: number;
    cliente: {
        id: number,
        razonSocial: string
    };
    fechaPedido: string;
    fechaConfirmacion?: string;
    fechaEntrega: string;
    fechaEntregado?: string;
    confirmado: boolean;
    entregado: boolean;
    descripcion: string;    
    total: number;
    saldo: number;
    tienePagos: boolean;
}