import { EntityTypeORMMap } from "@core/infrastructure/typeorm/mapping/entity-typeorm.map";
import { ColorTypeORMModel } from "../model/color.typeorm.model";
import { Color } from "@feature/inventario/color/domain/model/color.entity";

const COLOR_FIELD_MAP = new EntityTypeORMMap<Color, ColorTypeORMModel>()
COLOR_FIELD_MAP.set("id", "id")
COLOR_FIELD_MAP.set("descripcion","descripcion")
export default COLOR_FIELD_MAP;