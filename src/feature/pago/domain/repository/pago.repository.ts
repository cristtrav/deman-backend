import { NewPago } from "../model/new-pago";
import { Pago } from "../model/pago";

export abstract class PagoRepository {
    abstract findById(id: number): Promise<Pago | null>;
    abstract create(pago: NewPago): Promise<Pago>;
    abstract update(pago: Pago): Promise<Pago>;
    abstract delete(id: number): Promise<void>;
}
