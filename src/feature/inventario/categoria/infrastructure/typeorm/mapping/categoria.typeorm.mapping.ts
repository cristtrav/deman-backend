import { QueryFilterTypeORMMapping } from "@core/infrastructure/contract/query/query-filter.mapping.contract";
import { CategoriaTypeORMModel } from "../model/categoria.typeorm.model";
import { Categoria } from "@feature/inventario/categoria/domain/model/categoria.entity";

export const CATEGORIA_TYPEORM_MAPPING: QueryFilterTypeORMMapping<Categoria, CategoriaTypeORMModel> = {
    id: 'id',
    descripcion: "descripcion"
}