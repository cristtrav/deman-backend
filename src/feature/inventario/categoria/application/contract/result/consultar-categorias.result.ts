import { ResultPageContract } from "@core/application/contract/result/result-page.contract";
import { ResultContract } from "@core/application/contract/result/result.contract";
import { Categoria } from "@feature/inventario/categoria/domain/model/categoria.entity";

export class ConsultarCategoriasResult implements ResultContract<Categoria[]>{
    data: Categoria[];
    page?: ResultPageContract;
}