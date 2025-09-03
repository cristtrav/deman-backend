import { Marca } from "../model/marca";

export abstract class MarcaRepository {
    abstract findById(id: number): Promise<Marca | undefined>;
}