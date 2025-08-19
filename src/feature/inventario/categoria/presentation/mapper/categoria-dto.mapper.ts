import { CategoriaDTO } from "../dto/categoria.dto";
import { Categoria } from "../../domain/model/categoria.entity";

export class CategoriaDTOMapper{

    static toDto(categoria: Categoria): CategoriaDTO {
        return {
            id: categoria.id,
            descripcion: categoria.descripcion
        }
    }
}