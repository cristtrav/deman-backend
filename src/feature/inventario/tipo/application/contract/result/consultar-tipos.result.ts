import { ResultPageContract } from "@core/application/contract/result/result-page.contract";
import { ResultContract } from "@core/application/contract/result/result.contract";
import { Tipo } from "@feature/inventario/tipo/domain/model/tipo.entity";

export class ConsultarTiposResult implements ResultContract<Tipo[]>{
    data: Tipo[];
    page?: ResultPageContract | undefined;
}