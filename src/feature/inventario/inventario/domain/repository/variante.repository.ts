import { Variante } from "../model/variante";

export abstract class VarianteRepository{
    abstract findById(id: number): Promise<Variante | null>;
}