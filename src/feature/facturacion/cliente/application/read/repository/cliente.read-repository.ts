import { QueryContract } from "@core/application/contract/query/query.contract";
import { ResultContract } from "@core/application/contract/result/result.contract";
import { Cliente } from "@feature/facturacion/cliente/domain/model/cliente";

export abstract class ClienteReadRepository {
    abstract findById(id: number): Promise<Cliente | undefined>
    abstract findMany(query: QueryContract): Promise<ResultContract<Cliente[]>>
}