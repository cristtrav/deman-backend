import { CommandContract } from "@core/application/contract/command/command.contract";

export interface EliminarPedidoCommand extends CommandContract<{id: number}> { }