import { Usuario } from "@feature/auth/usuario/domain/model/usuario.entity";
import { CredencialReadRepository } from "../read-repository/credencial.read-repository";
import { TokenService } from "../port/token.service";
import { TokenInvalidoException } from "../exception/token-invalido.exception";
import { UsuarioInactivoException } from "../exception/usuario-inactivo.exception";
import { RefrescarSesionUseCase } from "./refrescar-sesion.usecase";

describe('RefrescarSesionUseCase', () => {
    let repo: jest.Mocked<CredencialReadRepository>
    let tokens: jest.Mocked<TokenService>
    let useCase: RefrescarSesionUseCase

    beforeEach(() => {
        repo = { findByCi: jest.fn(), findById: jest.fn() }
        tokens = {
            generarAccessToken: jest.fn().mockResolvedValue({ token: 'access2', expiresIn: 900 }),
            generarRefreshToken: jest.fn().mockResolvedValue({ token: 'refresh2', expiresIn: 604800 }),
            verificarAccessToken: jest.fn(),
            verificarRefreshToken: jest.fn().mockResolvedValue({ usuarioId: 3 })
        }
        useCase = new RefrescarSesionUseCase(repo, tokens)
    })

    it('emite un nuevo par de tokens', async () => {
        repo.findById.mockResolvedValue(new Usuario(3, 'Juan', 'Pérez', '1234567', 'hash', true, false))

        const result = await useCase.execute({ data: 'token' })

        expect(tokens.verificarRefreshToken).toHaveBeenCalledWith('token')
        expect(repo.findById).toHaveBeenCalledWith(3)
        expect(result.data.accessToken).toBe('access2')
        expect(result.data.refreshToken).toBe('refresh2')
    })

    it('propaga el error si el token es inválido', async () => {
        tokens.verificarRefreshToken.mockRejectedValue(new TokenInvalidoException())

        await expect(useCase.execute({ data: 'token' })).rejects.toBeInstanceOf(TokenInvalidoException)
        expect(repo.findById).not.toHaveBeenCalled()
    })

    it('rechaza si el usuario fue eliminado', async () => {
        repo.findById.mockResolvedValue(undefined)

        await expect(useCase.execute({ data: 'token' })).rejects.toBeInstanceOf(TokenInvalidoException)
    })

    it('rechaza si el usuario fue desactivado', async () => {
        repo.findById.mockResolvedValue(new Usuario(3, 'Juan', 'Pérez', '1234567', 'hash', false, false))

        await expect(useCase.execute({ data: 'token' })).rejects.toBeInstanceOf(UsuarioInactivoException)
    })
})
