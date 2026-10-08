import { ResultContract } from "@core/application/contract/result/result.contract";
import { EmpresaData } from "../data/empresa.data";

// data es null mientras la empresa no se haya registrado
export interface ConsultarEmpresaResult extends ResultContract<EmpresaData | null> {
}
