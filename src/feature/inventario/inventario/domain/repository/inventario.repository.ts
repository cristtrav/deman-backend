import { EditInventario } from "../model/edit-inventario";
import { Inventario } from "../model/inventario";
import { NewInventario } from "../model/new-inventario";

export abstract class InventarioRepository {
    abstract create(inventario: NewInventario): Promise<Inventario>;
    abstract edit(inventario: EditInventario): Promise<Inventario>;
    abstract delete(id: number): Promise<void>;
    abstract findById(id: number): Promise<Inventario | null>;
}