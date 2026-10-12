import { Usuario } from "@feature/auth/usuario/domain/model/usuario.entity";
import { CredencialReadRepository } from "../read-repository/credencial.read-repository";
import { PasswordHasher } from "../port/password-hasher";
import { TokenService } from "../port/token.service";
import { CredencialesInvalidasException } from "../exception/credenciales-invalidas.exception";
import { UsuarioInactivoException } from "../exception/usuario-inactivo.exception";
import { IniciarSesionUseCase } from "./iniciar-sesion.usecase";

describe('IniciarSesionUseCase', () => {
    const usuario = (activo = true) => new Usuario(3, 'Juan', 'Pérez', '1234567', 'hash', activo)

    let repo: jest.Mocked<CredencialReadRepository>
    let hasher: jest.Mocked<PasswordHasher>
    let tokens: jest.Mocked<TokenService>
    let useCase: IniciarSesionUseCase

    beforeEach(() => {
        repo = { findByCi: jest.fn(), findById: jest.fn() }
        hasher = { hash: jest.fn(), compare: jest.fn(), simularComparacion: jest.fn() }
        tokens = {
            generarAccessToken: jest.fn().mockResolvedValue({ token: 'access', expiresIn: 900 }),
            generarRefreshToken: jest.fn().mockResolvedValue({ token: 'refresh', expiresIn: 604800 }),
            verificarAccessToken: jest.fn(),
            verificarRefreshToken: jest.fn()
        }
        useCase = new IniciarSesionUseCase(repo, hasher, tokens)
    })

    it('genera los tokens con credenciales válidas', async () => {
        repo.findByCi.mockResolvedValue(usuario())
        hasher.compare.mockResolvedValue(true)

        const result = await useCase.execute({ data: { ci: '1234567', password: 'secreto' } })

        expect(hasher.compare).toHaveBeenCalledWith('secreto', 'hash')
        expect(tokens.generarAccessToken).toHaveBeenCalledWith({ usuarioId: 3, ci: '1234567', nombres: 'Juan', apellidos: 'Pérez' })
        expect(tokens.generarRefreshToken).toHaveBeenCalledWith({ usuarioId: 3 })
        expect(result.data).toEqual({
            accessToken: 'access',
            refreshToken: 'refresh',
            expiresIn: 900,
            usuario: { id: 3, nombres: 'Juan', apellidos: 'Pérez', ci: '1234567' }
        })
    })

    it('normaliza el CI quitando puntos y espacios', async () => {
        repo.findByCi.mockResolvedValue(usuario())
        hasher.compare.mockResolvedValue(true)

        await useCase.execute({ data: { ci: ' 1.234.567 ', password: 'secreto' } })

        expect(repo.findByCi).toHaveBeenCalledWith('1234567')
    })

    it('rechaza un CI inexistente simulando la comparación', async () => {
        repo.findByCi.mockResolvedValue(undefined)

        await expect(useCase.execute({ data: { ci: '999', password: 'x' } }))
            .rejects.toBeInstanceOf(CredencialesInvalidasException)
        expect(hasher.simularComparacion).toHaveBeenCalledWith('x')
        expect(tokens.generarAccessToken).not.toHaveBeenCalled()
    })

    it('rechaza una contraseña incorrecta', async () => {
        repo.findByCi.mockResolvedValue(usuario())
        hasher.compare.mockResolvedValue(false)

        await expect(useCase.execute({ data: { ci: '1234567', password: 'mala' } }))
            .rejects.toBeInstanceOf(CredencialesInvalidasException)
        expect(tokens.generarAccessToken).not.toHaveBeenCalled()
    })

    it('no revela que el usuario está inactivo si la contraseña es incorrecta', async () => {
        repo.findByCi.mockResolvedValue(usuario(false))
        hasher.compare.mockResolvedValue(false)

        await expect(useCase.execute({ data: { ci: '1234567', password: 'mala' } }))
            .rejects.toBeInstanceOf(CredencialesInvalidasException)
    })

    it('rechaza un usuario inactivo con contraseña correcta', async () => {
        repo.findByCi.mockResolvedValue(usuario(false))
        hasher.compare.mockResolvedValue(true)

        await expect(useCase.execute({ data: { ci: '1234567', password: 'secreto' } }))
            .rejects.toBeInstanceOf(UsuarioInactivoException)
        expect(tokens.generarAccessToken).not.toHaveBeenCalled()
    })
})
