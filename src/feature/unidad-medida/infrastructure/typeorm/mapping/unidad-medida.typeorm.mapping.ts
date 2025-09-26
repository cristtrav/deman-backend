import { EntityTypeORMMap } from "@core/infrastructure/typeorm/mapping/entity-typeorm.map";
import { UnidadMedida } from "@feature/unidad-medida/domain/model/unidad-medida";
import { UnidadMedidaTypeORMModel } from "../model/unidad-medida.typeorm.model";

const UNIDAD_MEDIDA_FIELD_MAP = new EntityTypeORMMap<UnidadMedida, UnidadMedidaTypeORMModel>();
UNIDAD_MEDIDA_FIELD_MAP.set('id', 'id');
UNIDAD_MEDIDA_FIELD_MAP.set('descripcion.singular', 'descripcionSingular');
UNIDAD_MEDIDA_FIELD_MAP.set('descripcion.plural', 'descripcionPlural');
UNIDAD_MEDIDA_FIELD_MAP.set('abreviatura.singular', 'abreviaturaSingular');
UNIDAD_MEDIDA_FIELD_MAP.set('abreviatura.plural', 'abreviaturaPlural');
export default UNIDAD_MEDIDA_FIELD_MAP;