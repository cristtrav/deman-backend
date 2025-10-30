import { EntityTypeORMMap } from "@core/infrastructure/typeorm/mapping/entity-typeorm.map";
import { Usuario } from "@feature/auth/usuario/domain/model/usuario.entity";
import { UsuarioTypeORMModel } from "../model/usuario.typeorm.model";

const PRODUCTO_FIELD_MAP = new EntityTypeORMMap<Usuario, UsuarioTypeORMModel>();
PRODUCTO_FIELD_MAP.set("id", "id");
PRODUCTO_FIELD_MAP.set("nombres", "nombres")
PRODUCTO_FIELD_MAP.set("apellidos", "apellidos")
PRODUCTO_FIELD_MAP.set("ci", "ci")
PRODUCTO_FIELD_MAP.set("password", "password")
PRODUCTO_FIELD_MAP.set("activo", "activo")
export default PRODUCTO_FIELD_MAP;