import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Request } from "express";
import { ES_PUBLICO } from "@core/presentation/decorator/publico.decorator";
import { TokenService } from "../../application/port/token.service";
import { AccessTokenPayload } from "../../application/contract/token-payload";
import { TokenRequeridoException } from "../../application/exception/token-requerido.exception";

export interface RequestAutenticado extends Request {
    usuario: AccessTokenPayload;
}

/**
 * Exige un access token válido en la cabecera "Authorization: Bearer <token>"
 * para todos los endpoints, salvo los marcados con @Publico().
 * No controla roles: cualquier usuario con un token válido tiene acceso.
 */
export class AccessTokenGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private tokenService: TokenService
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const esPublico = this.reflector.getAllAndOverride<boolean>(ES_PUBLICO, [
            context.getHandler(),
            context.getClass()
        ])
        if (esPublico) return true

        const request = context.switchToHttp().getRequest<RequestAutenticado>()
        const token = this.extraerToken(request)
        if (token == null) throw new TokenRequeridoException()

        // Lanza TokenInvalidoException si el token es inválido o expiró
        request.usuario = await this.tokenService.verificarAccessToken(token)
        return true
    }

    private extraerToken(request: Request): string | undefined {
        const [tipo, token] = request.headers.authorization?.split(' ') ?? []
        return tipo?.toLowerCase() === 'bearer' && token ? token : undefined
    }
}
