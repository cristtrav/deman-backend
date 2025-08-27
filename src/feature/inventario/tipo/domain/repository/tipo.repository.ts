import { NewTipo } from "../model/new-tipo.entity";
import { Tipo } from "../model/tipo.entity";

export abstract class TipoRepository {
        abstract create(NewTipo: NewTipo): Promise<Tipo>;
        abstract findById(id: number): Promise<Tipo | null>;
        abstract edit(tipo: Tipo): Promise<Tipo>;
        abstract delete(id: number): Promise<void>;
    }