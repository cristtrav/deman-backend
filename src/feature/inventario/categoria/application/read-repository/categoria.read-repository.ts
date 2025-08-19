import { QueryContract } from "@core/application/contract/query/query.contract";
import { ConsultarCategoriasResult } from "../contract/result/consultar-categorias.result";

export abstract class CategoriaReadRepository {
    abstract findMany(query: QueryContract): Promise<ConsultarCategoriasResult>;
}