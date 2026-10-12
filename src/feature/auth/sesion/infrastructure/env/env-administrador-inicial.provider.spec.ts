import { EnvAdministradorInicialProvider } from './env-administrador-inicial.provider';

describe('EnvAdministradorInicialProvider', () => {
    const envOriginal = process.env
    const provider = new EnvAdministradorInicialProvider()

    beforeEach(() => {
        process.env = { ...envOriginal, ADMIN_CI: '1.234.567', ADMIN_PASSWORD: 'secreto123' }
        delete process.env.ADMIN_NOMBRES
        delete process.env.ADMIN_APELLIDOS
    })

    afterAll(() => { process.env = envOriginal })

    it('lee los datos y usa nombres por defecto', () => {
        expect(provider.obtener()).toEqual({
            ci: '1.234.567',
            password: 'secreto123',
            nombres: 'Administrador',
            apellidos: 'del Sistema'
        })
    })

    it('usa ADMIN_NOMBRES y ADMIN_APELLIDOS si están definidos', () => {
        process.env.ADMIN_NOMBRES = 'Juan'
        process.env.ADMIN_APELLIDOS = 'Pérez'
        expect(provider.obtener()).toMatchObject({ nombres: 'Juan', apellidos: 'Pérez' })
    })

    it('falla si falta ADMIN_CI', () => {
        delete process.env.ADMIN_CI
        expect(() => provider.obtener()).toThrow('ADMIN_CI')
    })

    it('falla si falta ADMIN_PASSWORD', () => {
        process.env.ADMIN_PASSWORD = '  '
        expect(() => provider.obtener()).toThrow('ADMIN_PASSWORD')
    })

    it('falla con una contraseña demasiado corta', () => {
        process.env.ADMIN_PASSWORD = 'corta'
        expect(() => provider.obtener()).toThrow('ADMIN_PASSWORD')
    })

    it('falla con una contraseña de más de 72 bytes', () => {
        process.env.ADMIN_PASSWORD = 'ñ'.repeat(37)
        expect(() => provider.obtener()).toThrow('ADMIN_PASSWORD')
    })

    it('falla con un CI de más de 20 caracteres', () => {
        process.env.ADMIN_CI = '1'.repeat(21)
        expect(() => provider.obtener()).toThrow('ADMIN_CI')
    })
})
