import { EntityTypeORMMap } from "@core/infrastructure/typeorm/mapping/entity-typeorm.map";
import { Inventario } from "@feature/inventario/inventario/domain/model/inventario";
import { InventarioTypeORMModel } from "../model/inventario.typeorm.model";

const INVENTARIO_FIELD_MAP = new EntityTypeORMMap<Inventario, InventarioTypeORMModel>();
INVENTARIO_FIELD_MAP.set('id', 'id')
export default INVENTARIO_FIELD_MAP;