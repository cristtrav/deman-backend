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
                tipo: {
                    id: productoVariante.producto.tipo.id,
                    descripcion: productoVariante.producto.tipo.descripcion
                },
                categoria: {
                    id: productoVariante.producto.categoria.id,
                    descripcion: productoVariante.producto.categoria.descripcion
                },
                unidadMedida: {
                    id: productoVariante.producto.unidadMedida.id,
                    descripcion: {
                        singular: productoVariante.producto.unidadMedida.descripcion.singular,
                        plural: productoVariante.producto.unidadMedida.descripcion.plural
                    },
                    abreviatura: {
                        singular: productoVariante.producto.unidadMedida.abreviatura.singular,
                        plural: productoVariante.producto.unidadMedida.abreviatura.plural
                    }
                }
            },
            variante: {
                id: productoVariante.variante.id,
                descripcion: productoVariante.variante.descripcion,
                tamanio: {
                    id: productoVariante.variante.tamanio.id,
                    descripcion: productoVariante.variante.tamanio.descripcion
                },
                color: {
                    id: productoVariante.variante.color.id,
                    descripcion: productoVariante.variante.color.descripcion
                }
            }
        }
    }
}