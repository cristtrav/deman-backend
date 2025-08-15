import { NewTipo } from "../model/new-tipo.entity";
import { Tipo } from "../model/tipo.entity";

export abstract class TipoRepository {
        abstract create(tipo: NewTipo): Promise<Tipo>;
        abstract getById(id: number): Promise<Tipo | null>;
        abstract update(id: number, descripcion:string): Promise<Tipo>;
        abstract delete(id: number): Promise<void>;
        abstract count(): Promise<number>;
        abstract findByName(nombre: string): Promise<Tipo | null>;
    }