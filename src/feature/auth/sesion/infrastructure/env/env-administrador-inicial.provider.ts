import { config } from 'dotenv';
import { AdministradorInicialProvider } from '@feature/auth/sesion/application/port/administrador-inicial.provider';
import { AdministradorInicialData } from '@feature/auth/sesion/application/contract/administrador-inicial.data';
import { normalizarCi } from '@feature/auth/usuario/domain/util/normalizar-ci';

config();

const NOMBRES_POR_DEFECTO = 'Administrador';
const APELLIDOS_POR_DEFECTO = 'del Sistema';
const PASSWORD_MIN = 8;
// bcrypt solo considera los primeros 72 bytes
const PASSWORD_MAX_BYTES = 72;

// Lee el primer usuario de ADMIN_CI, ADMIN_PASSWORD, ADMIN_NOMBRES y ADMIN_APELLIDOS
export class EnvAdministradorInicialProvider implements AdministradorInicialProvider {

    obtener(): AdministradorInicialData {
        const ci = this.requerir('ADMIN_CI')
        const password = this.requerir('ADMIN_PASSWORD')
        const nombres = process.env.ADMIN_NOMBRES?.trim() || NOMBRES_POR_DEFECTO
        const apellidos = process.env.ADMIN_APELLIDOS?.trim() || APELLIDOS_POR_DEFECTO

        const ciNormalizado = normalizarCi(ci)
        if (ciNormalizado.length == 0 || ciNormalizado.length > 20)
            throw new Error('ADMIN_CI debe tener entre 1 y 20 caracteres (sin contar los puntos)')
        if (password.length < PASSWORD_MIN || Buffer.byteLength(password, 'utf8') > PASSWORD_MAX_BYTES)
            throw new Error(`ADMIN_PASSWORD debe tener al menos ${PASSWORD_MIN} caracteres y como máximo ${PASSWORD_MAX_BYTES} bytes`)
        if (nombres.length > 60) throw new Error('ADMIN_NOMBRES no puede superar los 60 caracteres')
        if (apellidos.length > 60) throw new Error('ADMIN_APELLIDOS no puede superar los 60 caracteres')

        return { ci, password, nombres, apellidos }
    }

    private requerir(nombre: string): string {
        const valor = process.env[nombre]
        if (!valor || valor.trim().length == 0)
            throw new Error(`No existe ningún usuario: defina ${nombre} en el archivo .env para crear el usuario administrador`)
        return valor
    }
}
