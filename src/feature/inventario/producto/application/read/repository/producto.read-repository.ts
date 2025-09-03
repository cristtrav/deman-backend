import { QueryContract } from "@core/application/contract/query/query.contract";
import { ResultContract } from "@core/application/contract/result/result.contract";
import { Producto } from "@feature/inventario/producto/domain/model/producto";

export abstract class ProductoReadRepository {
    abstract findById(id: number): Promise<Producto | undefined>;
    abstract findMany(query: QueryContract): Promise<ResultContract<Producto[]>>;
}