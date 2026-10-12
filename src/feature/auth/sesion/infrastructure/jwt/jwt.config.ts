import { config } from 'dotenv';

config();

const DURACION_REGEX = /^(\d+)([smhd])$/;
const SEGUNDOS_POR_UNIDAD: Record<string, number> = { s: 1, m: 60, h: 3600, d: 86400 };

export class JwtConfig {
    constructor(
        readonly accessSecret: string,
        readonly refreshSecret: string,
        readonly accessExpiresIn: number,
        readonly refreshExpiresIn: number,
        readonly issuer: string
    ) { }

    // Falla al iniciar la aplicación si la configuración es inválida
    static fromEnv(): JwtConfig {
        const accessSecret = JwtConfig.requerirSecreto('JWT_ACCESS_SECRET')
        const refreshSecret = JwtConfig.requerirSecreto('JWT_REFRESH_SECRET')
        if (accessSecret === refreshSecret)
            throw new Error('JWT_ACCESS_SECRET y JWT_REFRESH_SECRET deben ser distintos')

        return new JwtConfig(
            accessSecret,
            refreshSecret,
            JwtConfig.parsearDuracion('JWT_ACCESS_EXPIRES_IN', '15m'),
            JwtConfig.parsearDuracion('JWT_REFRESH_EXPIRES_IN', '7d'),
            process.env.JWT_ISSUER || 'deman-backend'
        )
    }

    private static requerirSecreto(nombre: string): string {
        const valor = process.env[nombre]
        if (!valor || valor.length < 32)
            throw new Error(`La variable de entorno ${nombre} es obligatoria y debe tener al menos 32 caracteres`)
        return valor
    }

    // Convierte valores como "15m" o "7d" a segundos
    private static parsearDuracion(nombre: string, porDefecto: string): number {
        const valor = process.env[nombre] || porDefecto
        const match = DURACION_REGEX.exec(valor)
        if (match == null)
            throw new Error(`La variable de entorno ${nombre} tiene un formato inválido: '${valor}' (ej.: 15m, 8h, 7d)`)
        return parseInt(match[1], 10) * SEGUNDOS_POR_UNIDAD[match[2]]
    }
}
