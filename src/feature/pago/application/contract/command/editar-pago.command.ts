import { CommandContract } from "@core/application/contract/command/command.contract";
import { EditarPagoData } from "../data/editar-pago.data";

export interface EditarPagoCommand extends CommandContract<EditarPagoData> {
    previousId: number;
}
