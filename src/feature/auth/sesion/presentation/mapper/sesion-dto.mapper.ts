import { SesionResult } from "../../application/contract/sesion.result";
import { SesionDTO } from "../dto/sesion.dto";

export class SesionDTOMapper {
    static toDTO(sesion: SesionResult): SesionDTO {
        return {
            accessToken: sesion.accessToken,
            refreshToken: sesion.refreshToken,
            tokenType: 'Bearer',
            expiresIn: sesion.expiresIn,
            usuario: {
                id: sesion.usuario.id,
                nombres: sesion.usuario.nombres,
                apellidos: sesion.usuario.apellidos,
                ci: sesion.usuario.ci,
                isAdmin: sesion.usuario.isAdmin
            }
        }
    }
}
