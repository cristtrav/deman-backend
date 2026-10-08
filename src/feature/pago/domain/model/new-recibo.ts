import { Temporal } from "@js-temporal/polyfill";
import { BusinessRuleException } from "@core/domain/exception/business-rule.exception";
import { Pago } from "./pago";
import { Empresa } from "./empresa";
import { DatosRecibo, validarDatosRecibo } from "./datos-recibo";

export class NewRecibo {
    public readonly datos: DatosRecibo;

    private constructor(datos: DatosRecibo){
        validarDatosRecibo(datos);
        if(datos.empresa?.nombre == null)
            throw new BusinessRuleException(`No se puede emitir el recibo Nº ${datos.numero} sin los datos de la empresa`);
        this.datos = datos;
    }

    /**
     * Emite el recibo de un pago recién registrado, copiando los datos de la empresa, los del cliente
     * y los saldos del pedido antes y después del pago.
     */
    static emitir(
        numero: number,
        pago: Pago,
        saldoAnterior: number,
        saldoPosterior: number,
        fechaEmision: Temporal.Instant,
        empresa: Empresa
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
            empresa: empresa ? {
                nombre: empresa.nombre,
                direccion: empresa.direccion,
                ruc: empresa.ruc,
                telefono: empresa.telefono
            } : undefined,
            generadoPorMigracion: false
        });
    }
}
