import { EntityTypeORMMapping } from "@core/infrastructure/typeorm/mapping/entity-typeorm.mapping.contract";
import { CategoriaTypeORMModel } from "../model/categoria.typeorm.model";
import { Categoria } from "@feature/inventario/categoria/domain/model/categoria.entity";

export const CATEGORIA_TYPEORM_MAPPING: EntityTypeORMMapping<Categoria, CategoriaTypeORMModel> = {
    id: 'id',
    descripcion: "descripcion"
}