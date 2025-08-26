import { EntityTypeORMMapping } from "@core/infrastructure/typeorm/mapping/entity-typeorm.mapping.contract";
import { ColorTypeORMModel } from "../model/color.typeorm.model";
import { Color } from "@feature/inventario/color/domain/model/color.entity";

export const COLOR_TYPEORM_MAPPING: EntityTypeORMMapping<Color, ColorTypeORMModel> = {
    id: 'id', 
    descripcion: "descripcion"
}