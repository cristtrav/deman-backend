import { Marca } from "@feature/inventario/marca/domain/model/marca.entity";
import { MarcaTypeORMModel } from "../model/marca.typeorm.model";

export class MarcaTypeORMMapper {
    static toDomain(marcaOrm: MarcaTypeORMModel): Marca{
        return new Marca(marcaOrm.id, marcaOrm.descripcion);
    }
}