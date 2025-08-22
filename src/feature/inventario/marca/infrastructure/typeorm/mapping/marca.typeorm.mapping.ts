import { EntityTypeORMMapping } from "@core/infrastructure/typeorm/mapping/entity-typeorm.mapping.contract";
import { MarcaTypeORMModel } from "../model/marca.typeorm.model";
import { Marca } from "@feature/inventario/marca/domain/model/marca.entity";

export const MARCA_TYPEORM_MAPPING: EntityTypeORMMapping<Marca, MarcaTypeORMModel> = {
    id: 'id',
    descripcion: 'descripcion'
}