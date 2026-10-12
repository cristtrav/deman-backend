import { AdministradorInicialData } from "../contract/administrador-inicial.data";

// Origen de los datos del primer usuario. Solo se consulta cuando no existe ningún usuario,
// y debe lanzar un error si los datos no están definidos o son inválidos.
export abstract class AdministradorInicialProvider {
    abstract obtener(): AdministradorInicialData;
}
