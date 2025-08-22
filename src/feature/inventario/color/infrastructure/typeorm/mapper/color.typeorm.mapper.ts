import { Color } from "@feature/inventario/color/domain/model/color.entity";
import { ColorTypeORMModel } from "../model/color.typeorm.model";
import { NewColor } from "@feature/inventario/color/domain/model/new-color.entity";

export class ColorTypeORMMapper {
    static toDomain(colorTypeORMModel: ColorTypeORMModel): Color {
        return new Color(
            colorTypeORMModel.id,
            colorTypeORMModel.descripcion,
        );
    }

    static toORMModel(color: Color | NewColor): ColorTypeORMModel {
        if (color instanceof NewColor) return this.newToORMModel(color);
        return this.existingToORMModel(color);
    }

   private static newToORMModel(newColor: NewColor): ColorTypeORMModel {
    const colorOrmModel = new ColorTypeORMModel();
    if(newColor.id != null) colorOrmModel.id = newColor.id;
    colorOrmModel.descripcion = newColor.descripcion;
    colorOrmModel.eliminado = false;
    return colorOrmModel;
}

    private static existingToORMModel(color: Color): ColorTypeORMModel{
        const colorOrmModel = new ColorTypeORMModel();
        colorOrmModel.id = color.id
        colorOrmModel.descripcion = color.descripcion
        colorOrmModel.eliminado = false;
        return colorOrmModel
    }

}