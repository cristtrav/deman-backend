import { Marca } from "@feature/marca/domain/model/marca.entity"
import { MarcaDTO } from "../dto/marca.dto"

export class MarcaDTOMapper {
    static toDTO (marca: Marca): MarcaDTO{
        console.log("mapper")
        return {
            id: marca.getId(),
            descripcion: marca.getDescripcion(),
            eliminado : marca.isEliminado()
        }
    }

    static toDomain(marcaDTO: MarcaDTO): Marca{
        return new Marca(
            marcaDTO.id,
            marcaDTO.descripcion,
            marcaDTO.eliminado
        )
    }
}