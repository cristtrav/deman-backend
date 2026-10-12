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
            crear: jest.fn().mockImplementation(async (n: NewUsuario) =>
                new Usuario(1, n.nombres, n.apellidos, n.ci, n.password, n.activo))
        }
        provider = {
            obtener: jest.fn().mockReturnValue({ ci: ' 1.234.567 ', password: 'secreto123', nombres: ' Admin ', apellidos: 'Sistema' })
        }
        hasher = { hash: jest.fn().mockResolvedValue('hash'), compare: jest.fn(), simularComparacion: jest.fn() }
        useCase = new CrearAdministradorInicialUseCase(transactionManager, repo, provider, hasher)
    })

    it('crea un usuario activo con el CI normalizado y la contraseña hasheada', async () => {
        const result = await useCase.execute()

        expect(hasher.hash).toHaveBeenCalledWith('secreto123')
        const creado = repo.crear.mock.calls[0][0]
        expect(creado.ci).toBe('1234567')
        expect(creado.nombres).toBe('Admin')
        expect(creado.password).toBe('hash')
        expect(creado.activo).toBe(true)
        expect(result.data?.id).toBe(1)
    })

    it('bloquea antes de verificar y todo dentro de una transacción', async () => {
        await useCase.execute()

        expect(transactionManager.run).toHaveBeenCalledTimes(1)
        expect(repo.bloquearUsuarios.mock.invocationCallOrder[0])
            .toBeLessThan(repo.existeUsuario.mock.invocationCallOrder[0])
    })

    it('no hace nada ni solicita los datos si ya existen usuarios', async () => {
        repo.existeUsuario.mockResolvedValue(true)

        const result = await useCase.execute()

        expect(result.data).toBeUndefined()
        expect(provider.obtener).not.toHaveBeenCalled()
        expect(repo.crear).not.toHaveBeenCalled()
    })

    it('propaga el error si no hay usuarios y faltan los datos', async () => {
        provider.obtener.mockImplementation(() => { throw new Error('defina ADMIN_CI') })

        await expect(useCase.execute()).rejects.toThrow('ADMIN_CI')
        expect(repo.crear).not.toHaveBeenCalled()
    })
})
