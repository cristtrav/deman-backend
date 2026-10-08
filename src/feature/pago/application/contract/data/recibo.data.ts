/**
 * Recibo tal como se emitió: los datos de la empresa, del cliente y los saldos son
 * los del momento de la emisión, no los actuales.
 */
export interface ReciboData {
    numero: number,
    pagoId: number,
    pedidoId: number,
    fechaEmision: string,
    fechaPago: string,
    monto: number,
    totalPedido: number,
    saldoAnterior: number,
    saldoPosterior: number,
    cliente: {
        razonSocial: string,
        ruc?: string
    },
    // Ausente solo en recibos generados antes de registrar la empresa
    empresa?: {
        nombre: string,
        direccion?: string,
        ruc?: string,
        telefono?: string
    },
    anulacion?: {
        fecha: string,
        motivo: string
    },
    generadoPorMigracion: boolean
}
