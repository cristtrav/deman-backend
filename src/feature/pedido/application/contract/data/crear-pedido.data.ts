export interface CrearPedidoData {
    fechaPedido: string,
    fechaConfirmacion: string,
    fechaEntrega: string,
    confirmado: boolean,
    entregado: boolean,
    clienteId: number,
    total: number,
    descripcion: string
}