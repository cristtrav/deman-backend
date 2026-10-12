import { JwtService } from '@nestjs/jwt';
import { TokenInvalidoException } from '@feature/auth/sesion/application/exception/token-invalido.exception';
import { JwtConfig } from './jwt.config';
import { JwtTokenService } from './jwt-token.service';

describe('JwtTokenService', () => {
    const config = new JwtConfig('a'.repeat(32), 'b'.repeat(32), 900, 604800, 'deman-backend')
    const jwtService = new JwtService({})
    const service = new JwtTokenService(jwtService, config)

    it('genera un access token con los claims del usuario', async () => {
        const { token, expiresIn } = await service.generarAccessToken({ usuarioId: 3, ci: '1234567', nombres: 'Juan', apellidos: 'Pérez' })

        const claims = jwtService.verify(token, { secret: config.accessSecret })
        expect(expiresIn).toBe(900)
        expect(claims).toMatchObject({ sub: '3', typ: 'access', ci: '1234567', nombres: 'Juan', apellidos: 'Pérez', iss: 'deman-backend' })
        expect(claims.exp - claims.iat).toBe(900)
        expect(claims.password).toBeUndefined()
    })

    it('verifica un refresh token propio', async () => {
        const { token } = await service.generarRefreshToken({ usuarioId: 3 })

        const claims = jwtService.decode(token)
        expect(claims.jti).toEqual(expect.any(String))
        expect(claims.exp - claims.iat).toBe(604800)
        await expect(service.verificarRefreshToken(token)).resolves.toEqual({ usuarioId: 3 })
    })

    it('rechaza un access token usado como refresh token', async () => {
        const { token } = await service.generarAccessToken({ usuarioId: 3, ci: '1', nombres: 'a', apellidos: 'b' })

        await expect(service.verificarRefreshToken(token)).rejects.toBeInstanceOf(TokenInvalidoException)
    })

    it('rechaza un token con typ distinto aunque esté firmado con el secreto de refresh', async () => {
        const token = await jwtService.signAsync({ typ: 'access' }, { secret: config.refreshSecret, issuer: 'deman-backend', subject: '3' })

        await expect(service.verificarRefreshToken(token)).rejects.toBeInstanceOf(TokenInvalidoException)
    })

    it('rechaza un refresh token expirado', async () => {
        const token = await jwtService.signAsync({ typ: 'refresh' }, { secret: config.refreshSecret, issuer: 'deman-backend', subject: '3', expiresIn: -10 })

        await expect(service.verificarRefreshToken(token)).rejects.toBeInstanceOf(TokenInvalidoException)
    })

    it('rechaza un token de otro emisor', async () => {
        const token = await jwtService.signAsync({ typ: 'refresh' }, { secret: config.refreshSecret, issuer: 'otro', subject: '3' })

        await expect(service.verificarRefreshToken(token)).rejects.toBeInstanceOf(TokenInvalidoException)
    })

    it('verifica un access token propio', async () => {
        const { token } = await service.generarAccessToken({ usuarioId: 3, ci: '1234567', nombres: 'Juan', apellidos: 'Pérez' })

        await expect(service.verificarAccessToken(token))
            .resolves.toEqual({ usuarioId: 3, ci: '1234567', nombres: 'Juan', apellidos: 'Pérez' })
    })

    it('rechaza un refresh token usado como access token', async () => {
        const { token } = await service.generarRefreshToken({ usuarioId: 3 })

        await expect(service.verificarAccessToken(token)).rejects.toBeInstanceOf(TokenInvalidoException)
    })

    it('rechaza un token con typ distinto aunque esté firmado con el secreto de access', async () => {
        const token = await jwtService.signAsync({ typ: 'refresh' }, { secret: config.accessSecret, issuer: 'deman-backend', subject: '3' })

        await expect(service.verificarAccessToken(token)).rejects.toBeInstanceOf(TokenInvalidoException)
    })

    it('rechaza un access token expirado', async () => {
        const token = await jwtService.signAsync({ typ: 'access' }, { secret: config.accessSecret, issuer: 'deman-backend', subject: '3', expiresIn: -10 })

        await expect(service.verificarAccessToken(token)).rejects.toBeInstanceOf(TokenInvalidoException)
    })

    it('rechaza un access token alterado', async () => {
        const { token } = await service.generarAccessToken({ usuarioId: 3, ci: '1', nombres: 'a', apellidos: 'b' })
        const [header, , firma] = token.split('.')
        const payload = Buffer.from(JSON.stringify({ typ: 'access', sub: '1', iss: 'deman-backend' })).toString('base64url')

        await expect(service.verificarAccessToken(`${header}.${payload}.${firma}`)).rejects.toBeInstanceOf(TokenInvalidoException)
    })
})
