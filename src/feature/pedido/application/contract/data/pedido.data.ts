import { ClienteData } from "./cliente.data";

export interface PedidoData{
    id: number,
    fechaPedido: string,
    fechaConfirmacion?: string,
    fechaEntrega: string,
    fechaEntregado?: string,
    confirmado: boolean,
    entregado: boolean,
    cliente: ClienteData,
    total: number,
    saldo: number,
    descripcion: string,
    tienePagos: boolean
}