import { ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Usuario } from "@feature/auth/usuario/domain/model/usuario.entity";
import { CredencialReadRepository } from "../../application/read-repository/credencial.read-repository";
import { AccesoDenegadoException } from "../../application/exception/acceso-denegado.exception";
import { TokenRequeridoException } from "../../application/exception/token-requerido.exception";
import { AdministradorGuard } from "./administrador.guard";

describe('AdministradorGuard', () => {
    const usuario = (activo: boolean, isAdmin: boolean) => new Usuario(3, 'Juan', 'Pérez', '1234567', 'hash', activo, isAdmin)

    let reflector: jest.Mocked<Reflector>
    let repo: jest.Mocked<CredencialReadRepository>
    let guard: AdministradorGuard

    const contexto = (autenticado = true) => {
        const request: any = autenticado ? { usuario: { usuarioId: 3, ci: '1234567', nombres: 'Juan', apellidos: 'Pérez' } } : {}
        return {
            getHandler: () => () => undefined,
            getClass: () => class { },
            switchToHttp: () => ({ getRequest: () => request })
        } as unknown as ExecutionContext
    }

    beforeEach(() => {
        reflector = { getAllAndOverride: jest.fn().mockReturnValue(true) } as unknown as jest.Mocked<Reflector>
        repo = { findByCi: jest.fn(), findById: jest.fn() }
        guard = new AdministradorGuard(reflector, repo)
    })

    it('permite los endpoints sin restricción sin consultar el usuario', async () => {
        reflector.getAllAndOverride.mockReturnValue(undefined)

        await expect(guard.canActivate(contexto(false))).resolves.toBe(true)
        expect(repo.findById).not.toHaveBeenCalled()
    })

    it('permite el acceso a un administrador activo', async () => {
        repo.findById.mockResolvedValue(usuario(true, true))

        await expect(guard.canActivate(contexto())).resolves.toBe(true)
        expect(repo.findById).toHaveBeenCalledWith(3)
    })

    it('rechaza a un usuario sin el permiso', async () => {
        repo.findById.mockResolvedValue(usuario(true, false))

        await expect(guard.canActivate(contexto())).rejects.toBeInstanceOf(AccesoDenegadoException)
    })

    it('rechaza a un administrador desactivado', async () => {
        repo.findById.mockResolvedValue(usuario(false, true))

        await expect(guard.canActivate(contexto())).rejects.toBeInstanceOf(AccesoDenegadoException)
    })

    it('rechaza a un usuario eliminado', async () => {
        repo.findById.mockResolvedValue(undefined)

        await expect(guard.canActivate(contexto())).rejects.toBeInstanceOf(AccesoDenegadoException)
    })

    it('rechaza una petición no autenticada', async () => {
        await expect(guard.canActivate(contexto(false))).rejects.toBeInstanceOf(TokenRequeridoException)
    })
})
