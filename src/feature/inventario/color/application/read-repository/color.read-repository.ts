import { QueryContract } from "@core/application/contract/query/query.contract";
import { ConsultarColoresResult } from "../contract/result/consultar-color.result";

export abstract class ColorReadRepository {
    abstract consultar (query: QueryContract): Promise<ConsultarColoresResult>
}