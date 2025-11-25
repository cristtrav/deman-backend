import { Tamanio } from "@feature/inventario/producto-variante/domain/model/tamanio";
import { TamanioTypeORMModel } from "../model/tamanio.typeorm.model";

export class TamanioTypeORMMapper {
    static toDomain(tamanioOrm: TamanioTypeORMModel): Tamanio {
        return new Tamanio(tamanioOrm.id, tamanioOrm.descripcion);
    }
}