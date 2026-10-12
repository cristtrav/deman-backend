export interface AccessTokenPayload {
    usuarioId: number;
    ci: string;
    nombres: string;
    apellidos: string;
}

export interface RefreshTokenPayload {
    usuarioId: number;
}

export interface TokenGenerado {
    token: string;
    // Segundos hasta la expiración
    expiresIn: number;
}
