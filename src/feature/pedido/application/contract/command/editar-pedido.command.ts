import { CommandContract } from "@core/application/contract/command/command.contract";
import { EditarPedidoData } from "../data/editar-pedido.data";

export interface EditarPedidoCommand extends CommandContract<EditarPedidoData>{
    previousId: number;
}