import { Producto } from "../../domain/model/producto";
import { ProductoDTO } from "../dto/producto.dto";

export class ProductoDTOMapper{
    static toDTO(producto: Producto): ProductoDTO{
        return {
            id: producto.id,
            descripcion: producto.descripcion,
            precio: producto.precio,
            marca: { id: producto.marca.id, descripcion: producto.marca.descripcion },
            tipo: { id: producto.tipo.id, descripcion: producto.tipo.descripcion },
            categoria: { id: producto.categoria.id, descripcion: producto.categoria.descripcion },
            unidadMedida: {
                id: producto.unidadMedida.id,
                descripcion: {
                    singular: producto.unidadMedida.descripcion.singular,
                    plural: producto.unidadMedida.descripcion.plural
                },
                abreviatura: {
                    singular: producto.unidadMedida.abreviatura.singular,
                    plural: producto.unidadMedida.abreviatura.plural
                }
            }
        }
    }
}