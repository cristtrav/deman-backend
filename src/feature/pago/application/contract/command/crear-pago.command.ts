import { CommandContract } from "@core/application/contract/command/command.contract";
import { CrearPagoData } from "../data/crear-pago.data";

export interface CrearPagoCommand extends CommandContract<CrearPagoData> { }
