import { QueryContract } from "@core/application/contract/query/query.contract";
import { ResultContract } from "@core/application/contract/result/result.contract";
import { UnidadMedida } from "@feature/unidad-medida/domain/model/unidad-medida";

export abstract class UnidadMedidaReadRepository {
    abstract findMany(query: QueryContract): Promise<ResultContract<UnidadMedida[]>>;
}