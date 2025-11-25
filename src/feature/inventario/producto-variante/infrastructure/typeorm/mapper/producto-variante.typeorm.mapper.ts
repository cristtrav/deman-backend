import { ProductoVarianteId } from "@feature/inventario/producto-variante/domain/model/producto-variante-id";
import { ProductoVariante } from "@feature/inventario/producto-variante/domain/model/produdcto-variante";
import { ProductoVarianteTypeORMModel } from "../model/producto-variante.typeorm.model";
import { ProductoTypeORMMapper } from "./producto.typeorm.mapper";
import { VarianteTypeORMMapper } from "./variante.typeorm.mapper";

export class ProductoVarianteTypeORMMapper {
    static toDomain(productoVarianteOrm: ProductoVarianteTypeORMModel): ProductoVariante {
        return new ProductoVariante(
            new ProductoVarianteId(productoVarianteOrm.idproducto, productoVarianteOrm.idvariante),
            ProductoTypeORMMapper.toDomain(productoVarianteOrm.producto),
            VarianteTypeORMMapper.toDomain(productoVarianteOrm.variante)
        );
    }
}