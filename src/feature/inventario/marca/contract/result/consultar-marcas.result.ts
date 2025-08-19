import { ResultContract } from "@core/application/contract/result/result.contract";
import { Marca } from "../../domain/model/marca.entity";
import { ResultPageContract } from "@core/application/contract/result/result-page.contract";

export class ConsultarMarcasResult implements ResultContract<Marca[]>{
    data: Marca[];
    page?: ResultPageContract | undefined;
}