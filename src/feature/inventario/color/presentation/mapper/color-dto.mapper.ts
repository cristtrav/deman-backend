import { Color } from "@feature/inventario/color/domain/model/color.entity"
import { ColorDTO } from "../dto/color.dto"

export class ColorDTOMapper {
    static toDTO(color: Color): ColorDTO {
            return {
                id: color.id,
                descripcion: color.descripcion
            }
        }

    static toDomain(colorDTO: ColorDTO): Color{
        return new Color(
            colorDTO.id,
            colorDTO.descripcion            
        )
    }
}