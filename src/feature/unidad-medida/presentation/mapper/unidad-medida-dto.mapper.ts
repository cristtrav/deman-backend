import { UnidadMedida } from "@feature/unidad-medida/domain/model/unidad-medida";
import { UnidadMedidaDTO } from "../dto/unidad-medida.dto";

export class UnidadMedidaDTOMapper{
    static toDTO(um: UnidadMedida): UnidadMedidaDTO{
        return {
            id: um.id,
            descripcion: {
                singular: um.descripcion.singular,
                plural: um.descripcion.plural
            },
            abreviatura: {
                singular: um.abreviatura.singular,
                plural: um.abreviatura.plural
            }
        }
    }
}