import { QueryContract } from "@core/application/contract/query/query.contract";
import { ResultContract } from "@core/application/contract/result/result.contract";
import { Venta } from "../../domain/model/venta";

export abstract class VentaReadRepository {
    abstract findMany(query: QueryContract): Promise<ResultContract<Venta[]>>
}