import { Tipo } from "@feature/tipo/domain/model/tipo.entity"
import { TipoDTO } from "../dto/tipo.dto"

export class TipoDTOMapper {
    static toDTO (tipo: Tipo): TipoDTO{
        return {
            id: tipo.getId(),
            descripcion: tipo.getDescripcion(),
            eliminado : tipo.isEliminado()
        }
    }

    static toDomain(tipoDTO: TipoDTO): Tipo{
        return new Tipo(
            tipoDTO.id,
            tipoDTO.descripcion,
            tipoDTO.eliminado
        )
    }
}