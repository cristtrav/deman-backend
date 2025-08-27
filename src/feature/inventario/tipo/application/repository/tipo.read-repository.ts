import { QueryContract } from "@core/application/contract/query/query.contract";
import { ConsultarTiposResult } from "../contract/result/consultar-tipos.result";

export abstract class TipoReadRepository {
    abstract consultar (query: QueryContract): Promise<ConsultarTiposResult>
}