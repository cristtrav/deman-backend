import { BusinessRuleException } from "@core/domain/exception/business-rule.exception";
import { UsuarioRepository } from "../../domain/repository/usuario.repository";
import { EliminarUsuarioUseCase } from "./eliminar-usuario.usecase";

describe('EliminarUsuarioUseCase', () => {
    let repo: jest.Mocked<UsuarioRepository>
    let useCase: EliminarUsuarioUseCase

    beforeEach(() => {
        repo = {
            create: jest.fn(),
            edit: jest.fn(),
            editPassword: jest.fn(),
            delete: jest.fn().mockResolvedValue(undefined),
            findById: jest.fn()
        }
        useCase = new EliminarUsuarioUseCase(repo)
    })

    it('elimina otro usuario', async () => {
        await useCase.execute({ data: { id: 5 }, solicitanteId: 1 })

        expect(repo.delete).toHaveBeenCalledWith(5)
    })

    it('impide eliminar el propio usuario', async () => {
        await expect(useCase.execute({ data: { id: 1 }, solicitanteId: 1 }))
            .rejects.toBeInstanceOf(BusinessRuleException)
        expect(repo.delete).not.toHaveBeenCalled()
    })
})
