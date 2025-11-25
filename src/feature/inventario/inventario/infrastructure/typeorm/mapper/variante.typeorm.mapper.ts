import { Variante } from "@feature/inventario/inventario/domain/model/variante";
import { VarianteTypeORMModel } from "../model/variante.typeorm.model";
import { ColorTypeORMMapper } from "./color.typeorm.mapper";
import { TamanioTypeORMMapper } from "./tamanio.typeorm.mapper";

export class VarianteTypeORMMapper{
    static toDomain(varianteOrm: VarianteTypeORMModel): Variante {
        return new Variante(
            varianteOrm.id,
            ColorTypeORMMapper.toDomain(varianteOrm.color),
            TamanioTypeORMMapper.toDomain(varianteOrm.tamanio),
            varianteOrm.descripcion
        );
    }
}