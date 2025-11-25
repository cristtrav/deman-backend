import { QueryContract } from "@core/application/contract/query/query.contract";
import { Usuario } from "../../domain/model/usuario.entity";
import { ResultContract } from "@core/application/contract/result/result.contract";

export abstract class UsuarioReadRepository {
    abstract findById(id: number): Promise<Usuario | undefined>
    abstract findMany(query: QueryContract): Promise<ResultContract<Usuario[]>>
}