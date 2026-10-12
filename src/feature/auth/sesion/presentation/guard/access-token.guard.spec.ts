import { ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { TokenService } from "../../application/port/token.service";
import { TokenInvalidoException } from "../../application/exception/token-invalido.exception";
import { TokenRequeridoException } from "../../application/exception/token-requerido.exception";
import { AccessTokenGuard } from "./access-token.guard";

describe('AccessTokenGuard', () => {
    const payload = { usuarioId: 3, ci: '1234567', nombres: 'Juan', apellidos: 'Pérez' }

    let reflector: jest.Mocked<Reflector>
    let tokens: jest.Mocked<TokenService>
    let guard: AccessTokenGuard

    const contexto = (authorization?: string) => {
        const request: any = { headers: authorization == null ? {} : { authorization } }
        const context = {
            getHandler: () => () => undefined,
            getClass: () => class { },
            switchToHttp: () => ({ getRequest: () => request })
        } as unknown as ExecutionContext
        return { context, request }
    }

    beforeEach(() => {
        reflector = { getAllAndOverride: jest.fn().mockReturnValue(undefined) } as unknown as jest.Mocked<Reflector>
        tokens = {
            generarAccessToken: jest.fn(),
            generarRefreshToken: jest.fn(),
            verificarAccessToken: jest.fn().mockResolvedValue(payload),
            verificarRefreshToken: jest.fn()
        }
        guard = new AccessTokenGuard(reflector, tokens)
    })

    it('permite el acceso con un token válido y adjunta el usuario al request', async () => {
        const { context, request } = contexto('Bearer abc')

        await expect(guard.canActivate(context)).resolves.toBe(true)
        expect(tokens.verificarAccessToken).toHaveBeenCalledWith('abc')
        expect(request.usuario).toEqual(payload)
    })

    it('acepta el esquema sin distinguir mayúsculas', async () => {
        await expect(guard.canActivate(contexto('bearer abc').context)).resolves.toBe(true)
    })

    it('permite los endpoints públicos sin token', async () => {
        reflector.getAllAndOverride.mockReturnValue(true)

        await expect(guard.canActivate(contexto().context)).resolves.toBe(true)
        expect(tokens.verificarAccessToken).not.toHaveBeenCalled()
    })

    it('rechaza una petición sin cabecera Authorization', async () => {
        await expect(guard.canActivate(contexto().context)).rejects.toBeInstanceOf(TokenRequeridoException)
    })

    it('rechaza un esquema distinto de Bearer', async () => {
        await expect(guard.canActivate(contexto('Basic abc').context)).rejects.toBeInstanceOf(TokenRequeridoException)
    })

    it('rechaza un token inválido', async () => {
        tokens.verificarAccessToken.mockRejectedValue(new TokenInvalidoException())

        await expect(guard.canActivate(contexto('Bearer abc').context)).rejects.toBeInstanceOf(TokenInvalidoException)
    })
})
