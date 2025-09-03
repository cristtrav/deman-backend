import { Tipo } from "@feature/inventario/producto/domain/model/tipo";
import { TipoTypeORMModel } from "../model/tipo.typeorm.model";

export class TipoTypeORMMapper{
    static toDomain(tipoTypeOrm: TipoTypeORMModel): Tipo{
        return new Tipo(tipoTypeOrm.id, tipoTypeOrm.descripcion);
    }
}