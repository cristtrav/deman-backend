import { EntityTypeORMMap } from "@core/infrastructure/typeorm/mapping/entity-typeorm.map";
import { MarcaTypeORMModel } from "../model/marca.typeorm.model";
import { Marca } from "@feature/inventario/marca/domain/model/marca.entity";

const MARCA_FIELD_MAP = new EntityTypeORMMap<Marca, MarcaTypeORMModel>();
MARCA_FIELD_MAP.set("id", "id");
MARCA_FIELD_MAP.set("descripcion", "descripcion");
export default MARCA_FIELD_MAP;