import { TransactionManager } from "@core/application/transaction/transaction-manager";
import { NewUsuario } from "@feature/auth/usuario/domain/model/new-usuario.entity";
import { Usuario } from "@feature/auth/usuario/domain/model/usuario.entity";
import { AdministradorInicialRepository } from "../repository/administrador-inicial.repository";
import { AdministradorInicialProvider } from "../port/administrador-inicial.provider";
import { PasswordHasher } from "../port/password-hasher";
import { CrearAdministradorInicialUseCase } from "./crear-administrador-inicial.usecase";

describe('CrearAdministradorInicialUseCase', () => {
    let transactionManager: jest.Mocked<TransactionManager>
    let repo: jest.Mocked<AdministradorInicialRepository>
    let provider: jest.Mocked<AdministradorInicialProvider>
    let hasher: jest.Mocked<PasswordHasher>
    let useCase: CrearAdministradorInicialUseCase

    beforeEach(() => {
        transactionManager = { run: jest.fn().mockImplementation(work => work()) }
        repo = {
            bloquearUsuarios: jest.fn().mockResolvedValue(undefined),
            existeUsuario: jest.fn().mockResolvedValue(false),
            existeAdministrador: jest.fn().mockResolvedValue(false),
            otorgarAdministrador: jest.fn().mockImplementation(async (ci: string) =>
                new Usuario(7, 'Juan', 'Pérez', ci, 'hash', true, true)),
            crear: jest.fn().mockImplementation(async (n: NewUsuario) =>
                new Usuario(1, n.nombres, n.apellidos, n.ci, n.password, n.activo, n.isAdmin))
        }
        provider = {
            obtener: jest.fn().mockReturnValue({ ci: ' 1.234.567 ', password: 'secreto123', nombres: ' Admin ', apellidos: 'Sistema' }),
            obtenerCi: jest.fn().mockReturnValue(' 1.234.567 ')
        }
        hasher = { hash: jest.fn().mockResolvedValue('hash'), compare: jest.fn(), simularComparacion: jest.fn() }
        useCase = new CrearAdministradorInicialUseCase(transactionManager, repo, provider, hasher)
    })

    it('crea un administrador activo con el CI normalizado y la contraseña hasheada', async () => {
        const result = await useCase.execute()

        expect(hasher.hash).toHaveBeenCalledWith('secreto123')
        const creado = repo.crear.mock.calls[0][0]
        expect(creado.ci).toBe('1234567')
        expect(creado.nombres).toBe('Admin')
        expect(creado.password).toBe('hash')
        expect(creado.activo).toBe(true)
        expect(creado.isAdmin).toBe(true)
        expect(result.data).toMatchObject({ estado: 'creado', usuario: { id: 1 } })
    })

    it('bloquea antes de verificar y todo dentro de una transacción', async () => {
        await useCase.execute()

        expect(transactionManager.run).toHaveBeenCalledTimes(1)
        expect(repo.bloquearUsuarios.mock.invocationCallOrder[0])
            .toBeLessThan(repo.existeAdministrador.mock.invocationCallOrder[0])
    })

    it('no hace nada ni solicita los datos si ya existe un administrador', async () => {
        repo.existeAdministrador.mockResolvedValue(true)
        repo.existeUsuario.mockResolvedValue(true)

        const result = await useCase.execute()

        expect(result.data).toEqual({ estado: 'existente' })
        expect(provider.obtener).not.toHaveBeenCalled()
        expect(provider.obtenerCi).not.toHaveBeenCalled()
        expect(repo.crear).not.toHaveBeenCalled()
        expect(repo.otorgarAdministrador).not.toHaveBeenCalled()
    })

    it('otorga el permiso al usuario de la configuración si hay usuarios pero ningún administrador', async () => {
        repo.existeUsuario.mockResolvedValue(true)

        const result = await useCase.execute()

        expect(repo.otorgarAdministrador).toHaveBeenCalledWith('1234567')
        expect(result.data).toMatchObject({ estado: 'promovido', usuario: { id: 7 } })
        // La contraseña no hace falta para otorgar el permiso
        expect(provider.obtener).not.toHaveBeenCalled()
        expect(repo.crear).not.toHaveBeenCalled()
    })

    it('informa que no hay administrador si el CI de la configuración no corresponde a un usuario', async () => {
        repo.existeUsuario.mockResolvedValue(true)
        repo.otorgarAdministrador.mockResolvedValue(undefined)

        const result = await useCase.execute()

        expect(result.data).toEqual({ estado: 'sin-administrador' })
    })

    it('informa que no hay administrador si la configuración no define el CI', async () => {
        repo.existeUsuario.mockResolvedValue(true)
        provider.obtenerCi.mockReturnValue(undefined)

        const result = await useCase.execute()

        expect(result.data).toEqual({ estado: 'sin-administrador' })
        expect(repo.otorgarAdministrador).not.toHaveBeenCalled()
    })

    it('propaga el error si no hay usuarios y faltan los datos', async () => {
        provider.obtener.mockImplementation(() => { throw new Error('defina ADMIN_CI') })

        await expect(useCase.execute()).rejects.toThrow('ADMIN_CI')
        expect(repo.crear).not.toHaveBeenCalled()
    })
})
