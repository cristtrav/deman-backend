import { Temporal } from "@js-temporal/polyfill";
import { RequiredFieldException } from "@core/domain/exception/required-field.exception";
import { BusinessRuleException } from "@core/domain/exception/business-rule.exception";

/**
 * Copia de los datos de la empresa emisora al momento de emitir el recibo.
 */
export interface DatosEmpresaRecibo {
    nombre: string;
    direccion?: string;
    ruc?: string;
    telefono?: string;
}

/**
 * Datos que se fijan al emitir un recibo. Los saldos son los del pedido en el momento de la emisión.
 */
export interface DatosRecibo {
    numero: number;
    pagoId: number;
    pedidoId: number;
    fechaEmision: Temporal.Instant;
    fechaPago: Temporal.PlainDate;
    monto: number;
    totalPedido: number;
    saldoAnterior: number;
    saldoPosterior: number;
    clienteRazonSocial: string;
    clienteRuc?: string;
    // Solo puede faltar en los recibos emitidos antes de registrar la empresa
    empresa?: DatosEmpresaRecibo;
    generadoPorMigracion: boolean;
}

export function validarDatosRecibo(datos: DatosRecibo): void {
    const requeridos: (keyof DatosRecibo)[] = [
        'numero', 'pagoId', 'pedidoId', 'fechaEmision', 'fechaPago', 'monto',
        'totalPedido', 'saldoAnterior', 'saldoPosterior', 'clienteRazonSocial'
    ];
    requeridos.forEach(campo => {
        if(datos[campo] == null) throw new RequiredFieldException("Recibo", campo);
    });
    if(Number(datos.saldoAnterior) - Number(datos.monto) != Number(datos.saldoPosterior))
        throw new BusinessRuleException(`Los saldos del recibo «${datos.numero}» no son consistentes con su monto`);
}
