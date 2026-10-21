export class UsuarioSesionDTO {
    id: number
    nombres: string
    apellidos: string
    ci: string
    // Solo informativo para la interfaz: la API verifica el permiso en cada operación
    isAdmin: boolean
}

export class SesionDTO {
    accessToken: string
    refreshToken: string
    tokenType: string
    expiresIn: number
    usuario: UsuarioSesionDTO
}
