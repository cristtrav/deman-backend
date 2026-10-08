import { NewMovimientoSaldo } from "../model/new-movimiento-saldo";

export abstract class MovimientoSaldoRepository {
    abstract create(movimiento: NewMovimientoSaldo): Promise<void>;
}
