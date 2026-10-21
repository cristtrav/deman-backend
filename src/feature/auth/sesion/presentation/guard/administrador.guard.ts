import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { SOLO_ADMINISTRADORES } from "@core/presentation/decorator/solo-administradores.decorator";
import { CredencialReadRepository } from "../../application/read-repository/credencial.read-repository";
import { AccesoDenegadoException } from "../../application/exception/acceso-denegado.exception";
import { TokenRequeridoException } from "../../application/exception/token-requerido.exception";
import { RequestAutenticado } from "./access-token.guard";

/**
 * Permite los endpoints marcados con @SoloAdministradores() solo a usuarios administradores.
 * Debe ejecutarse después de AccessTokenGuard, que adjunta el usuario al request.
 * El permiso se consulta en la base y no en el token, para que retirarlo tenga efecto inmediato.
 */
export class AdministradorGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private credencialReadRepository: CredencialReadRepository
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const soloAdministradores = this.reflector.getAllAndOverride<boolean>(SOLO_ADMINISTRADORES, [
            context.getHandler(),
            context.getClass()
        ])
        if (!soloAdministradores) return true

        const request = context.switchToHttp().getRequest<RequestAutenticado>()
        if (request.usuario == null) throw new TokenRequeridoException()

        // El usuario pudo haber sido eliminado, desactivado o perdido el permiso desde que se emitió el token
        const usuario = await this.credencialReadRepository.findById(request.usuario.usuarioId)
        if (usuario == null || !usuario.activo || !usuario.isAdmin) throw new AccesoDenegadoException()
        return true
    }
}
