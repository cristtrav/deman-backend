import { Usuario } from "../../domain/model/usuario.entity";
import { UsuarioRepository } from "../../domain/repository/usuario.repository";
import { EditarUsuarioUseCase } from "./editar-usuario.usecase";

describe('EditarUsuarioUseCase', () => {
    let repo: jest.Mocked<UsuarioRepository>
    let useCase: EditarUsuarioUseCase

    beforeEach(() => {
        repo = {
            create: jest.fn(),
            edit: jest.fn().mockImplementation(async (_id: number, u: Usuario) => u),
            editPassword: jest.fn(),
            delete: jest.fn(),
            findById: jest.fn()
        }
        useCase = new EditarUsuarioUseCase(repo)
    })

    it('guarda el CI sin puntos ni espacios, como lo busca el login', async () => {
        await useCase.execute({
            previousId: 1,
            data: { id: 1, nombres: 'Juan', apellidos: 'Pérez', ci: '1.234.567', password: 'hash', activo: true }
        })

        expect(repo.edit.mock.calls[0][1].ci).toBe('1234567')
    })
})
