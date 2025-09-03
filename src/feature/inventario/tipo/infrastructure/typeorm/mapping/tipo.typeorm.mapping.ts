import { EntityTypeORMMapping } from "@core/infrastructure/typeorm/mapping/entity-typeorm.mapping.contract";
import { Tipo } from "@feature/inventario/tipo/domain/model/tipo.entity";
import { TipoTypeORMModel } from "../model/tipo.typeorm.model";

export const TIPO_TYPEORM_MAPPING: EntityTypeORMMapping<Tipo, TipoTypeORMModel> = {
    id: 'id', 
    descripcion: "descripcion"
}