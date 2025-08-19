import { Marca } from "../../domain/model/marca.entity"
import { MarcaDTO } from "../dto/marca.dto"

export class MarcaDTOMapper {
    static toDTO (marca: Marca): MarcaDTO{
        return {
            id: marca.id,
            descripcion: marca.descripcion,
            eliminado : false
        }
    }

    static toDomain(marcaDTO: MarcaDTO): Marca{
        return new Marca(
            marcaDTO.id,
            marcaDTO.descripcion            
        )
    }
}