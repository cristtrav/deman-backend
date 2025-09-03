import { Producto } from "@feature/inventario/producto/domain/model/producto";
import { ProductoTypeORMModel } from "../model/producto.typeorm.model";
import { EntityTypeORMMap } from "@core/infrastructure/typeorm/mapping/entity-typeorm.map";

const PRODUCTO_FIELD_MAP = new EntityTypeORMMap<Producto, ProductoTypeORMModel>();
PRODUCTO_FIELD_MAP.set("id", "id");
PRODUCTO_FIELD_MAP.set("descripcion", "descripcion")
PRODUCTO_FIELD_MAP.set("precio", "precio")
PRODUCTO_FIELD_MAP.set("marca.id", "marca.id")
PRODUCTO_FIELD_MAP.set("marca.descripcion", "marca.descripcion")
PRODUCTO_FIELD_MAP.set("categoria.id", "categoria.id")
PRODUCTO_FIELD_MAP.set("categoria.descripcion", "categoria.descripcion")
PRODUCTO_FIELD_MAP.set("tipo.id", "tipo.id")
PRODUCTO_FIELD_MAP.set("tipo.descripcion", "tipo.descripcion")
PRODUCTO_FIELD_MAP.set("unidadMedida.id", "unidadMedida.id")
export default PRODUCTO_FIELD_MAP;