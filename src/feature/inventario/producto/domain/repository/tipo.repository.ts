import { Tipo } from "../model/tipo";

export abstract class TipoRepository {
    abstract findById(id: number): Promise<Tipo | undefined>;
}