import { Categoria } from "../model/categoria.entity";
import { NewCategoria } from "../model/new-categoria.entity";

export abstract class CategoriaRepository{
    abstract create(newCategoria: NewCategoria): Promise<Categoria>;
    abstract edit(categoria: Categoria): Promise<Categoria>;
    abstract delete(id: number): Promise<void>;
    abstract findById(id: number): Promise<Categoria | null>;
}