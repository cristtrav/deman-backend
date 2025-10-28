import { ProductoVariante } from "../../domain/model/produdcto-variante";
import { ProductoVarianteDTO } from "../dto/producto-variante.dto";

export class ProductoVarianteDTOMapper {
    static toDTO(productoVariante: ProductoVariante): ProductoVarianteDTO{
        return {
            id: {
                idproducto: productoVariante.id.idProducto, 
                idvariante: productoVariante.id.idVariante
            },
            producto: {
                id: productoVariante.producto.id,
                descripcion: productoVariante.producto.descripcion,
                tipo: productoVariante.producto.tipo.descripcion,
                categoria: productoVariante.producto.categoria.descripcion
            },
            variante: {
                id: productoVariante.variante.id,
                descripcion: productoVariante.variante.descripcion,
                tamanio: productoVariante.variante.tamanio.descripcion,
                color: productoVariante.variante.color.descripcion
            }
        }
    }
}