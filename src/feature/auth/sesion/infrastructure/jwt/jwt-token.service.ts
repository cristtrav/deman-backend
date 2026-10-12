import { randomUUID } from 'crypto';
import { JwtService } from '@nestjs/jwt';
import { TokenService } from '@feature/auth/sesion/application/port/token.service';
import { AccessTokenPayload, RefreshTokenPayload, TokenGenerado } from '@feature/auth/sesion/application/contract/token-payload';
import { TokenInvalidoException } from '@feature/auth/sesion/application/exception/token-invalido.exception';
import { JwtConfig } from './jwt.config';

const ALGORITMO = 'HS256';

interface RefreshTokenClaims {
    sub: string;
    typ: string;
}

interface AccessTokenClaims {
    sub: string;
    typ: string;
    ci: string;
    nombres: string;
    apellidos: string;
}

export class JwtTokenService implements TokenService {
    constructor(
        private jwtService: JwtService,
        private jwtConfig: JwtConfig
    ) { }

    async generarAccessToken(payload: AccessTokenPayload): Promise<TokenGenerado> {
        const token = await this.jwtService.signAsync(
            {
                typ: 'access',
                ci: payload.ci,
                nombres: payload.nombres,
                apellidos: payload.apellidos
            },
            {
                secret: this.jwtConfig.accessSecret,
                expiresIn: this.jwtConfig.accessExpiresIn,
                issuer: this.jwtConfig.issuer,
                subject: String(payload.usuarioId),
                algorithm: ALGORITMO
            }
        )
        return { token, expiresIn: this.jwtConfig.accessExpiresIn }
    }

    async generarRefreshToken(payload: RefreshTokenPayload): Promise<TokenGenerado> {
        const token = await this.jwtService.signAsync(
            { typ: 'refresh' },
            {
                secret: this.jwtConfig.refreshSecret,
                expiresIn: this.jwtConfig.refreshExpiresIn,
                issuer: this.jwtConfig.issuer,
                subject: String(payload.usuarioId),
                jwtid: randomUUID(),
                algorithm: ALGORITMO
            }
        )
        return { token, expiresIn: this.jwtConfig.refreshExpiresIn }
    }

    async verificarAccessToken(token: string): Promise<AccessTokenPayload> {
        let claims: AccessTokenClaims
        try {
            claims = await this.jwtService.verifyAsync<AccessTokenClaims>(token, {
                secret: this.jwtConfig.accessSecret,
                issuer: this.jwtConfig.issuer,
                algorithms: [ALGORITMO]
            })
        } catch {
            throw new TokenInvalidoException()
        }
        const usuarioId = Number(claims.sub)
        if (claims.typ !== 'access' || !Number.isInteger(usuarioId)) throw new TokenInvalidoException()
        return { usuarioId, ci: claims.ci, nombres: claims.nombres, apellidos: claims.apellidos }
    }

    async verificarRefreshToken(token: string): Promise<RefreshTokenPayload> {
        let claims: RefreshTokenClaims
        try {
            claims = await this.jwtService.verifyAsync<RefreshTokenClaims>(token, {
                secret: this.jwtConfig.refreshSecret,
                issuer: this.jwtConfig.issuer,
                algorithms: [ALGORITMO]
            })
        } catch {
            throw new TokenInvalidoException()
        }
        const usuarioId = Number(claims.sub)
        if (claims.typ !== 'refresh' || !Number.isInteger(usuarioId)) throw new TokenInvalidoException()
        return { usuarioId }
    }
}
