import { Categoria } from "../model/categoria";

export abstract class CategoriaRepository {
    abstract findById(id: number): Promise<Categoria | undefined>;
}