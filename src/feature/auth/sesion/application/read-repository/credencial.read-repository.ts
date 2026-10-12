import { Usuario } from "@feature/auth/usuario/domain/model/usuario.entity";

// Solo considera usuarios no eliminados
export abstract class CredencialReadRepository {
    abstract findByCi(ci: string): Promise<Usuario | undefined>;
    abstract findById(id: number): Promise<Usuario | undefined>;
}
