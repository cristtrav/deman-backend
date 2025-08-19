import { QueryFilterTypeORMMapping } from "@core/infrastructure/contract/query/query-filter.mapping.contract";
import { MarcaTypeORMModel } from "../model/marca.typeorm.model";
import { Marca } from "@feature/inventario/marca/domain/model/marca.entity";

export const MARCA_TYPEORM_MAPPING: QueryFilterTypeORMMapping<Marca, MarcaTypeORMModel> = {
    id: 'id',
    descripcion: 'descripcion'
}