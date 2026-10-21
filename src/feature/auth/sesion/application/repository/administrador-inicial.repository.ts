import { NewUsuario } from "@feature/auth/usuario/domain/model/new-usuario.entity";
import { Usuario } from "@feature/auth/usuario/domain/model/usuario.entity";

// Sus operaciones deben ejecutarse dentro de una misma transacción
export abstract class AdministradorInicialRepository {
    // Serializa la creación del primer usuario hasta el fin de la transacción
    abstract bloquearUsuarios(): Promise<void>;
    // Solo considera usuarios no eliminados
    abstract existeUsuario(): Promise<boolean>;
    // Solo considera usuarios activos y no eliminados
    abstract existeAdministrador(): Promise<boolean>;
    // Otorga el permiso de administrador al usuario activo y no eliminado con ese CI; undefined si no existe
    abstract otorgarAdministrador(ci: string): Promise<Usuario | undefined>;
    abstract crear(newUsuario: NewUsuario): Promise<Usuario>;
}
