import { CommandContract } from "@core/application/contract/command/command.contract";

export interface EliminarPagoCommand extends CommandContract<{id: number}> { }
