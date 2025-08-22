import { ResultContract } from "@core/application/contract/result/result.contract";
import { ResultPageContract } from "@core/application/contract/result/result-page.contract";
import { Marca } from "@feature/inventario/marca/domain/model/marca.entity";

export class ConsultarMarcasResult implements ResultContract<Marca[]>{
    data: Marca[];
    page?: ResultPageContract | undefined;
}