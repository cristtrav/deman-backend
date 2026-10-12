import { JwtConfig } from './jwt.config';

describe('JwtConfig', () => {
    const envOriginal = process.env

    beforeEach(() => {
        process.env = {
            ...envOriginal,
            JWT_ACCESS_SECRET: 'a'.repeat(32),
            JWT_REFRESH_SECRET: 'b'.repeat(32),
            JWT_ACCESS_EXPIRES_IN: '15m',
            JWT_REFRESH_EXPIRES_IN: '7d',
            JWT_ISSUER: 'deman-backend'
        }
    })

    afterAll(() => { process.env = envOriginal })

    it('convierte las duraciones a segundos', () => {
        const config = JwtConfig.fromEnv()
        expect(config.accessExpiresIn).toBe(900)
        expect(config.refreshExpiresIn).toBe(604800)
    })

    it('falla si falta un secreto', () => {
        delete process.env.JWT_ACCESS_SECRET
        expect(() => JwtConfig.fromEnv()).toThrow('JWT_ACCESS_SECRET')
    })

    it('falla si un secreto es demasiado corto', () => {
        process.env.JWT_REFRESH_SECRET = 'corto'
        expect(() => JwtConfig.fromEnv()).toThrow('JWT_REFRESH_SECRET')
    })

    it('falla si ambos secretos son iguales', () => {
        process.env.JWT_REFRESH_SECRET = process.env.JWT_ACCESS_SECRET
        expect(() => JwtConfig.fromEnv()).toThrow('distintos')
    })

    it('falla con una duración inválida', () => {
        process.env.JWT_ACCESS_EXPIRES_IN = '15 minutos'
        expect(() => JwtConfig.fromEnv()).toThrow('JWT_ACCESS_EXPIRES_IN')
    })
})
