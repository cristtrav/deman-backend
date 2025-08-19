import { Marca } from "../model/marca.entity";
import { NewMarca } from "../model/new-marca.entity";

    export abstract class MarcaRepository {
        abstract create(marca: NewMarca): Promise<Marca>;
        abstract edit(marca: Marca): Promise<Marca>;
        abstract delete(id: number): Promise<void>;
        abstract findById(id: number): Promise<Marca | null>;
        
        //A refactorizar
        abstract listar(): Promise<Marca[]>;
        abstract contar(): Promise<number>;
        abstract buscarPorNombre(nombre: string): Promise<Marca | null>;
    }