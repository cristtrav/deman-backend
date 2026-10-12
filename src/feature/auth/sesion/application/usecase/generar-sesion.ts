import { Usuario } from "@feature/auth/usuario/domain/model/usuario.entity";
import { TokenService } from "../port/token.service";
import { SesionResult } from "../contract/sesion.result";

export async function generarSesion(tokenService: TokenService, usuario: Usuario): Promise<SesionResult> {
    const [access, refresh] = await Promise.all([
        tokenService.generarAccessToken({
            usuarioId: usuario.id,
            ci: usuario.ci,
            nombres: usuario.nombres,
            apellidos: usuario.apellidos
        }),
        tokenService.generarRefreshToken({ usuarioId: usuario.id })
    ])
    return {
        accessToken: access.token,
        refreshToken: refresh.token,
        expiresIn: access.expiresIn,
        usuario: {
            id: usuario.id,
            nombres: usuario.nombres,
            apellidos: usuario.apellidos,
            ci: usuario.ci
        }
    }
}
