export class ReciboDTO {
    numero: number;
    pagoId: number;
    pedidoId: number;
    fechaEmision: string;
    fechaPago: string;
    monto: number;
    totalPedido: number;
    saldoAnterior: number;
    saldoPosterior: number;
    cliente: {
        razonSocial: string,
        ruc?: string
    };
    empresa?: {
        nombre: string,
        direccion?: string,
        ruc?: string,
        telefono?: string
    };
    anulacion?: {
        fecha: string,
        motivo: string
    };
    generadoPorMigracion: boolean;
}
