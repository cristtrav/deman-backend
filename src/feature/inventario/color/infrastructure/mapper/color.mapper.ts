import { Color } from "@feature/inventario/color/domain/model/color.entity";
import { ColorTypeORMModel } from "../typeorm/model/color.typeorm.model";
import { NewColor } from "@feature/inventario/color/domain/model/new-color.entity";

export class ColorMapper {
    static toDomain(colorTypeORM: ColorTypeORMModel): Color {
        return new Color(
            colorTypeORM.id,
            colorTypeORM.descripcion,
            colorTypeORM.eliminado
        );
    }

    static toTypeORMModel(color: NewColor): ColorTypeORMModel {
        const colorTypeORM = new ColorTypeORMModel();
        colorTypeORM.descripcion = color.getDescripcion();
        colorTypeORM.eliminado = color.isEliminado();
        return colorTypeORM;
    }
}