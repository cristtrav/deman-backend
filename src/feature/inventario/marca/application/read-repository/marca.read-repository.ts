import { QueryContract } from "@core/application/contract/query/query.contract";
import { ConsultarMarcasResult } from "../../contract/result/consultar-marcas.result";

export abstract class MarcaReadRepository{
    abstract consultar(query: QueryContract): Promise<ConsultarMarcasResult>;
}