import { NewUsuario } from "../model/new-usuario.entity";
import { Usuario } from "../model/usuario.entity";

export abstract class UsuarioRepository {
    abstract create(newUsuario: NewUsuario): Promise<Usuario>;
    abstract edit(previousId: number, usuario: Usuario): Promise<Usuario>;
    abstract editPassword(previousId: number, password: string): Promise<void>;
    abstract delete(id: number): Promise<void>;
    abstract findById(id: number): Promise<Usuario | undefined>;
}