import { CommandContract } from "@core/application/contract/command/command.contract";
import { AnularPagoData } from "../data/anular-pago.data";

export interface AnularPagoCommand extends CommandContract<AnularPagoData> { }
