import { Temporal } from "@js-temporal/polyfill";
import { NewRecibo } from "@feature/pago/domain/model/new-recibo";
import { Recibo } from "@feature/pago/domain/model/recibo";
import { DatosRecibo } from "@feature/pago/domain/model/datos-recibo";
import { ReciboTypeORMModel } from "../model/recibo.typeorm.model";

export class ReciboTypeORMMapper {
    static toDomain(reciboOrm: ReciboTypeORMModel): Recibo {
        const datos: DatosRecibo = {
            numero: reciboOrm.numero,
            pagoId: reciboOrm.pagoId,
            pedidoId: reciboOrm.pedidoId,
            fechaEmision: this.toInstant(reciboOrm.fechaEmision),
            fechaPago: Temporal.PlainDate.from(reciboOrm.fechaPago),
            monto: reciboOrm.monto,
            totalPedido: reciboOrm.totalPedido,
            saldoAnterior: reciboOrm.saldoAnterior,
            saldoPosterior: reciboOrm.saldoPosterior,
            clienteRazonSocial: reciboOrm.clienteRazonSocial,
            clienteRuc: reciboOrm.clienteRuc ?? undefined,
            generadoPorMigracion: reciboOrm.generadoPorMigracion
        };
        const anulacion = reciboOrm.anulado && reciboOrm.fechaAnulacion
            ? { fecha: this.toInstant(reciboOrm.fechaAnulacion), motivo: reciboOrm.motivoAnulacion ?? '' }
            : undefined;
        return new Recibo(reciboOrm.id, datos, anulacion);
    }

    static toORM(recibo: NewRecibo | Recibo): ReciboTypeORMModel {
        const { datos } = recibo;
        const reciboOrm = new ReciboTypeORMModel();
        if(recibo instanceof Recibo) reciboOrm.id = recibo.id;
        reciboOrm.numero = datos.numero;
        reciboOrm.pagoId = datos.pagoId;
        reciboOrm.pedidoId = datos.pedidoId;
        reciboOrm.fechaEmision = this.toDate(datos.fechaEmision);
        reciboOrm.fechaPago = datos.fechaPago.toString();
        reciboOrm.monto = datos.monto;
        reciboOrm.totalPedido = datos.totalPedido;
        reciboOrm.saldoAnterior = datos.saldoAnterior;
        reciboOrm.saldoPosterior = datos.saldoPosterior;
        reciboOrm.clienteRazonSocial = datos.clienteRazonSocial;
        reciboOrm.clienteRuc = datos.clienteRuc ?? null;
        reciboOrm.generadoPorMigracion = datos.generadoPorMigracion;
        const anulacion = recibo instanceof Recibo ? recibo.anulacion : undefined;
        reciboOrm.anulado = anulacion != null;
        reciboOrm.fechaAnulacion = anulacion ? this.toDate(anulacion.fecha) : null;
        reciboOrm.motivoAnulacion = anulacion?.motivo ?? null;
        return reciboOrm;
    }

    private static toInstant(date: Date): Temporal.Instant {
        return Temporal.Instant.fromEpochMilliseconds(date.getTime());
    }

    private static toDate(instant: Temporal.Instant): Date {
        return new Date(instant.epochMilliseconds);
    }
}
