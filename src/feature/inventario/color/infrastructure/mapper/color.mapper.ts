import { Color } from "../../domain/model/color.entity";
import { NewColor } from "../../domain/model/new-color.entity";
import { ColorTypeORMModel } from "../typeorm/model/color.typeorm.model";

export class ColorMapper {
    static toDomain(colorTypeORM: ColorTypeORMModel): Color {
        return new Color(
            colorTypeORM.id,
            colorTypeORM.descripcion
        );
    }

    static toTypeORMModel(color: NewColor): ColorTypeORMModel {
        const colorTypeORM = new ColorTypeORMModel();
        colorTypeORM.descripcion = color.descripcion;
        colorTypeORM.eliminado = false;
        return colorTypeORM;
    }
}