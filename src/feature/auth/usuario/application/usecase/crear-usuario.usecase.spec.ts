import { RequiredFieldException } from "@core/domain/exception/required-field.exception";
import { NewUsuario } from "../../domain/model/new-usuario.entity";
import { Usuario } from "../../domain/model/usuario.entity";
import { UsuarioRepository } from "../../domain/repository/usuario.repository";
import { CrearUsuarioUseCase } from "./crear-usuario.usecase";

describe('CrearUsuarioUseCase', () => {
    const datos = { nombres: 'Juan', apellidos: 'Pérez', ci: ' 1.234.567 ', password: 'secreto123', activo: true, isAdmin: false }

    let repo: jest.Mocked<UsuarioRepository>
    let useCase: CrearUsuarioUseCase

    beforeEach(() => {
        repo = {
            create: jest.fn().mockImplementation(async (n: NewUsuario) =>
                new Usuario(1, n.nombres, n.apellidos, n.ci, n.password, n.activo, n.isAdmin)),
            edit: jest.fn(),
            editPassword: jest.fn(),
            delete: jest.fn(),
            findById: jest.fn()
        }
        useCase = new CrearUsuarioUseCase(repo)
    })

    it('guarda el CI sin puntos ni espacios, como lo busca el login', async () => {
        await useCase.execute({ data: datos })

        expect(repo.create.mock.calls[0][0].ci).toBe('1234567')
    })

    it('guarda el permiso de administrador indicado', async () => {
        await useCase.execute({ data: { ...datos, isAdmin: true } })

        expect(repo.create.mock.calls[0][0].isAdmin).toBe(true)
    })

    it('informa el campo requerido si falta el permiso de administrador', async () => {
        await expect(useCase.execute({ data: { ...datos, isAdmin: undefined as unknown as boolean } }))
            .rejects.toBeInstanceOf(RequiredFieldException)
        expect(repo.create).not.toHaveBeenCalled()
    })

    it('informa el campo requerido si falta el CI', async () => {
        await expect(useCase.execute({ data: { ...datos, ci: undefined as unknown as string } }))
            .rejects.toBeInstanceOf(RequiredFieldException)
        expect(repo.create).not.toHaveBeenCalled()
    })
})
