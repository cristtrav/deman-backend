import { NewUsuario } from "@feature/auth/usuario/domain/model/new-usuario.entity";
import { Usuario } from "@feature/auth/usuario/domain/model/usuario.entity";

// Sus operaciones deben ejecutarse dentro de una misma transacción
export abstract class AdministradorInicialRepository {
    // Serializa la creación del primer usuario hasta el fin de la transacción
    abstract bloquearUsuarios(): Promise<void>;
    // Solo considera usuarios no eliminados
    abstract existeUsuario(): Promise<boolean>;
    abstract crear(newUsuario: NewUsuario): Promise<Usuario>;
}
