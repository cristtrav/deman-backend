export interface EditarPedidoData {
    fechaPedido: string,
    fechaEntrega: string,
    fechaEntregado?: string,
    clienteId: number,
    total: number,
    descripcion: string
}