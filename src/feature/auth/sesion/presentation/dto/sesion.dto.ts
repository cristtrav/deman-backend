export class UsuarioSesionDTO {
    id: number
    nombres: string
    apellidos: string
    ci: string
}

export class SesionDTO {
    accessToken: string
    refreshToken: string
    tokenType: string
    expiresIn: number
    usuario: UsuarioSesionDTO
}
