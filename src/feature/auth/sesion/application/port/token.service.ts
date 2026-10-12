import { AccessTokenPayload, RefreshTokenPayload, TokenGenerado } from "../contract/token-payload";

export abstract class TokenService {
    abstract generarAccessToken(payload: AccessTokenPayload): Promise<TokenGenerado>;
    abstract generarRefreshToken(payload: RefreshTokenPayload): Promise<TokenGenerado>;
    // Lanza TokenInvalidoException si el token no es un access token válido
    abstract verificarAccessToken(token: string): Promise<AccessTokenPayload>;
    // Lanza TokenInvalidoException si el token no es un refresh token válido
    abstract verificarRefreshToken(token: string): Promise<RefreshTokenPayload>;
}
