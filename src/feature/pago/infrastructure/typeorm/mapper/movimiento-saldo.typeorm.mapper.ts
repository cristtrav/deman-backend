import { NewMovimientoSaldo } from "@feature/pago/domain/model/new-movimiento-saldo";
import { MovimientoSaldoTypeORMModel } from "../model/movimiento-saldo.typeorm.model";

export class MovimientoSaldoTypeORMMapper {
    static toORM(movimiento: NewMovimientoSaldo): MovimientoSaldoTypeORMModel {
        const movimientoOrm = new MovimientoSaldoTypeORMModel();
        movimientoOrm.pedidoId = movimiento.pedidoId;
        movimientoOrm.reciboId = movimiento.reciboId;
        movimientoOrm.tipo = movimiento.tipo;
        movimientoOrm.fecha = new Date(movimiento.fecha.epochMilliseconds);
        movimientoOrm.monto = movimiento.monto;
        movimientoOrm.saldoAnterior = movimiento.saldoAnterior;
        movimientoOrm.saldoPosterior = movimiento.saldoPosterior;
        return movimientoOrm;
    }
}
