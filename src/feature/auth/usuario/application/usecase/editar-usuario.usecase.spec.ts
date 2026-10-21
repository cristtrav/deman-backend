import { Usuario } from "../../domain/model/usuario.entity";
import { UsuarioRepository } from "../../domain/repository/usuario.repository";
import { EditarUsuarioUseCase } from "./editar-usuario.usecase";
import { BusinessRuleException } from "@core/domain/exception/business-rule.exception";

describe('EditarUsuarioUseCase', () => {
    let repo: jest.Mocked<UsuarioRepository>
    let useCase: EditarUsuarioUseCase

    beforeEach(() => {
        repo = {
            create: jest.fn(),
            edit: jest.fn().mockImplementation(async (_id: number, u: Usuario) => u),
            editPassword: jest.fn(),
            delete: jest.fn(),
            findById: jest.fn().mockResolvedValue(new Usuario(1, 'Juan', 'Pérez', '1234567', 'hash-guardado', true, true))
        }
        useCase = new EditarUsuarioUseCase(repo)
    })

    const datos = { id: 1, nombres: 'Juan', apellidos: 'Pérez', ci: '1.234.567', activo: true, isAdmin: true }

    it('guarda el CI sin puntos ni espacios, como lo busca el login', async () => {
        await useCase.execute({ previousId: 1, solicitanteId: 2, data: datos })

        expect(repo.edit.mock.calls[0][1].ci).toBe('1234567')
    })

    it('conserva la contraseña guardada', async () => {
        await useCase.execute({ previousId: 1, solicitanteId: 2, data: datos })

        expect(repo.findById).toHaveBeenCalledWith(1)
        expect(repo.edit.mock.calls[0][1].password).toBe('hash-guardado')
    })

    it('rechaza editar un usuario inexistente', async () => {
        repo.findById.mockResolvedValue(undefined)

        await expect(useCase.execute({ previousId: 1, solicitanteId: 2, data: datos }))
            .rejects.toBeInstanceOf(BusinessRuleException)
        expect(repo.edit).not.toHaveBeenCalled()
    })

    it('permite quitar el permiso de administrador a otro usuario', async () => {
        await useCase.execute({ previousId: 1, solicitanteId: 2, data: { ...datos, isAdmin: false } })

        expect(repo.edit.mock.calls[0][1].isAdmin).toBe(false)
    })

    it('permite editar el propio usuario conservando el permiso', async () => {
        await useCase.execute({ previousId: 1, solicitanteId: 1, data: datos })

        expect(repo.edit).toHaveBeenCalled()
    })

    it('impide quitarse el propio permiso de administrador', async () => {
        await expect(useCase.execute({ previousId: 1, solicitanteId: 1, data: { ...datos, isAdmin: false } }))
            .rejects.toBeInstanceOf(BusinessRuleException)
        expect(repo.edit).not.toHaveBeenCalled()
    })

    it('impide desactivar el propio usuario', async () => {
        await expect(useCase.execute({ previousId: 1, solicitanteId: 1, data: { ...datos, activo: false } }))
            .rejects.toBeInstanceOf(BusinessRuleException)
        expect(repo.edit).not.toHaveBeenCalled()
    })
})
