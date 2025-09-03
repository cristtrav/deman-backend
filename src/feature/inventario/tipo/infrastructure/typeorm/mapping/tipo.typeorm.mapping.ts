import { Tipo } from "@feature/inventario/tipo/domain/model/tipo.entity";
import { TipoTypeORMModel } from "../model/tipo.typeorm.model";
import { EntityTypeORMMap } from "@core/infrastructure/typeorm/mapping/entity-typeorm.map";

const TIPO_FIELD_MAP = new EntityTypeORMMap<Tipo, TipoTypeORMModel>();
TIPO_FIELD_MAP.set("id", "id")
TIPO_FIELD_MAP.set("descripcion", "descripcion");
export default TIPO_FIELD_MAP;