import { QueryContract } from "@core/application/contract/query/query.contract";
import { ResultContract } from "@core/application/contract/result/result.contract";
import { ProductoVariante } from "../../domain/model/produdcto-variante";

export abstract class ProductoVarianteReadRepository{
    abstract findMany(query: QueryContract): Promise<ResultContract<ProductoVariante[]>>;
}