import { NewVenta } from "../model/new-venta";
import { Venta } from "../model/venta";

export abstract class VentaRepository {
    abstract create(newVenta: NewVenta): Promise<Venta>;
    abstract findById(id: number): Promise<Venta | null>;
    abstract delete(id: number): Promise<void>;
}