import { QueryContract } from "@core/application/contract/query/query.contract";
import { ResultContract } from "@core/application/contract/result/result.contract";
import { Inventario } from "../../domain/model/inventario";

export abstract class InventarioReadRepository {
    abstract findMany(query: QueryContract): Promise<ResultContract<Inventario[]>>;
}