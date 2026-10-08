import { NewRecibo } from "../model/new-recibo";
import { Recibo } from "../model/recibo";

export abstract class ReciboRepository {
    abstract findByPago(pagoId: number): Promise<Recibo | null>;
    abstract create(recibo: NewRecibo): Promise<Recibo>;
    abstract update(recibo: Recibo): Promise<Recibo>;
}
