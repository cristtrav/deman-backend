import { DetalleInventario } from "../../domain/model/detalle-inventario";
import { DetalleInventarioDTO } from "../dto/detalle-inventario.dto";

export class DetalleInventarioDTOMapper {
    static toDTO(detalleInventario: DetalleInventario): DetalleInventarioDTO {
        return {
            id: detalleInventario.id,
            producto: {
                id: detalleInventario.producto.id,
                descripcion: detalleInventario.producto.descripcion,
                unidadMedida: {
                    id: detalleInventario.producto.unidadMedida.id,
                    descripcion: { 
                        singular: detalleInventario.producto.unidadMedida.descripcion.singular,
                        plural: detalleInventario.producto.unidadMedida.descripcion.plural
                    },
                    abreviatura: {
                        singular: detalleInventario.producto.unidadMedida.abreviatura.singular,
                        plural: detalleInventario.producto.unidadMedida.abreviatura.plural,
                    }
                }
            },
            variante: {
                id: detalleInventario.variante.id,
                color: {
                    id: detalleInventario.variante.color.id,
                    descripcion: detalleInventario.variante.color.descripcion
                },
                tamanio: {
                    id: detalleInventario.variante.tamanio.id,
                    descripcion: detalleInventario.variante.tamanio.descripcion 
                }
            },
            cantidad: detalleInventario.cantidad,
            cantidadPrevia: detalleInventario.cantidadPrevia,
            diferencia: detalleInventario.diferencia
        }
    }
}