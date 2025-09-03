import { ResultPageContract } from "@core/application/contract/result/result-page.contract";
import { ResultContract } from "@core/application/contract/result/result.contract";
import { Color } from "@feature/inventario/color/domain/model/color.entity";

export class ConsultarColoresResult implements ResultContract<Color[]>{
    data: Color[];
    page?: ResultPageContract | undefined;
}