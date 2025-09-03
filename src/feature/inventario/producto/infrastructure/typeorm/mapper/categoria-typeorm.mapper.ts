import { Categoria } from "@feature/inventario/producto/domain/model/categoria";
import { CategoriaTypeORMModel } from "../model/categoria.typeorm.model";

export class CategoriaTypeORMMapper {
    static toDomain(categoriaTypeOrm: CategoriaTypeORMModel): Categoria{
        return new Categoria(categoriaTypeOrm.id, categoriaTypeOrm.descripcion);
    }
}