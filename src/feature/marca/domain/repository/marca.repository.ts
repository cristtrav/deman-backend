import { Marca } from "../model/marca.entity";
import { NewMarca } from "../model/new-marca.entity";

    export abstract class MarcaRepository {
        abstract crear(marca: NewMarca): Promise<Marca>;
        abstract listar(): Promise<Marca[]>;
        abstract obtenerPorId(id: number): Promise<Marca | null>;
        abstract actualizar(id: number, descripcion:string): Promise<Marca>;
        abstract eliminar(id: number): Promise<void>;
        abstract contar(): Promise<number>;
        abstract buscarPorNombre(nombre: string): Promise<Marca | null>;
    }