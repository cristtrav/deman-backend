import { Tipo } from "../../domain/model/tipo.entity"
import { TipoDTO } from "../dto/tipo.dto"

export class TipoDTOMapper {
    static toDTO (tipo: Tipo): TipoDTO{
        return {
            id: tipo.id,
            descripcion: tipo.descripcion,
        }
    }

    static toDomain(tipoDTO: TipoDTO): Tipo{
        return new Tipo(
            tipoDTO.id,
            tipoDTO.descripcion,
        )
    }
}