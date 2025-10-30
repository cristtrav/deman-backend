import { Usuario } from "../../domain/model/usuario.entity";
import { UsuarioDTO } from "../dto/usuario.dto";

export class UsuarioDTOMapper{
    static toDTO(usuario: Usuario): UsuarioDTO{
        return {
            id: usuario.id,
            nombres: usuario.nombres,
            apellidos: usuario.apellidos,
            ci: usuario.ci,
            password: usuario.password, 
            activo: usuario.activo
            
        }
    }
}