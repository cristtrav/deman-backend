import { Color } from "@feature/inventario/inventario/domain/model/color";
import { ColorTypeORMModel } from "../model/color.typeorm.model";

export class ColorTypeORMMapper {
    static toDomain(colorOrm: ColorTypeORMModel): Color {
        return new Color(colorOrm.id, colorOrm.descripcion);
    }
}