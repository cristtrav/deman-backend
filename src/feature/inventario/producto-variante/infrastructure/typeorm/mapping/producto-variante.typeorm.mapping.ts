import { EntityTypeORMMap } from "@core/infrastructure/typeorm/mapping/entity-typeorm.map";
import { ProductoVariante } from "@feature/inventario/producto-variante/domain/model/produdcto-variante";
import { ProductoVarianteTypeORMModel } from "../model/producto-variante.typeorm.model";

const PRODUCTO_VARIANTE_MAP = new EntityTypeORMMap<ProductoVariante, ProductoVarianteTypeORMModel>()
//PRODUCTO_VARIANTE_MAP.set('id.idProducto', 'idproducto')
//PRODUCTO_VARIANTE_MAP.set('id.idVariante', 'idvariante')
PRODUCTO_VARIANTE_MAP.set('producto.descripcion', 'producto.descripcion')
export default PRODUCTO_VARIANTE_MAP;