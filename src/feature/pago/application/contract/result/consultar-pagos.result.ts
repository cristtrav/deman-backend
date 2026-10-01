import { ResultContract } from "@core/application/contract/result/result.contract";
import { PagoData } from "../data/pago.data";

export interface ConsultarPagosResult extends ResultContract<PagoData[]> {
}
