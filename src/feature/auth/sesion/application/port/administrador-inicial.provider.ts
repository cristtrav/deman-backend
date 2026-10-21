import { AdministradorInicialData } from "../contract/administrador-inicial.data";

// Origen de los datos del usuario administrador inicial
export abstract class AdministradorInicialProvider {
    // Solo se consulta cuando no existe ningún usuario.
    // Debe lanzar un error si los datos no están definidos o son inválidos.
    abstract obtener(): AdministradorInicialData;
    // CI del administrador, o undefined si no está definido. Se consulta cuando existen usuarios
    // pero ningún administrador, y no requiere el resto de los datos.
    abstract obtenerCi(): string | undefined;
}
