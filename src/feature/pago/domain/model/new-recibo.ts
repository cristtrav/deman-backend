import { Temporal } from "@js-temporal/polyfill";
import { Pago } from "./pago";
import { DatosRecibo, validarDatosRecibo } from "./datos-recibo";

export class NewRecibo {
    public readonly datos: DatosRecibo;

    private constructor(datos: DatosRecibo){
        validarDatosRecibo(datos);
        this.datos = datos;
    }

    /**
     * Emite el recibo de un pago recién registrado, copiando los datos del cliente
     * y los saldos del pedido antes y después del pago.
     */
    static emitir(
        numero: number,
        pago: Pago,
        saldoAnterior: number,
        saldoPosterior: number,
        fechaEmision: Temporal.Instant
    ): NewRecibo {
        return new NewRecibo({
            numero,
            pagoId: pago.id,
            pedidoId: pago.pedido.id,
            fechaEmision,
            fechaPago: pago.fecha,
            monto: pago.monto,
            totalPedido: pago.pedido.total,
            saldoAnterior,
            saldoPosterior,
            clienteRazonSocial: pago.pedido.cliente.razonSocial,
            clienteRuc: pago.pedido.cliente.ruc,
            generadoPorMigracion: false
        });
    }
}
