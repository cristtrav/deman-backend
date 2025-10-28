import { EntityTypeORMMap } from "@core/infrastructure/typeorm/mapping/entity-typeorm.map";
import { Cliente } from "@feature/facturacion/cliente/domain/model/cliente";
import { ClienteTypeORMModel } from "../model/cliente.typeorm.model";

const CLIENTE_FIELD_MAP = new EntityTypeORMMap<Cliente, ClienteTypeORMModel>();
CLIENTE_FIELD_MAP.set("id", "id");
CLIENTE_FIELD_MAP.set("razonSocial", "razonSocial")
CLIENTE_FIELD_MAP.set("ruc", "ruc")
CLIENTE_FIELD_MAP.set("telefono", "telefono")
export default CLIENTE_FIELD_MAP;