import { CategoriaTypeORMModel } from "../model/categoria.typeorm.model";
import { Categoria } from "@feature/inventario/categoria/domain/model/categoria.entity";
import { EntityTypeORMMap } from "@core/infrastructure/typeorm/mapping/entity-typeorm.map";

const CATEGORIA_FIELD_MAP = new EntityTypeORMMap<Categoria, CategoriaTypeORMModel>();
CATEGORIA_FIELD_MAP.set("id","id");
CATEGORIA_FIELD_MAP.set("descripcion", "descripcion");

export default CATEGORIA_FIELD_MAP;