export interface UsuarioSesion {
    id: number;
    nombres: string;
    apellidos: string;
    ci: string;
    isAdmin: boolean;
}

export interface SesionResult {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
    usuario: UsuarioSesion;
}
